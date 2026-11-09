import { setCurrentTemp, setNextHoursTemp } from './temp'

function fetchData(endpoint, elements) {
    fetch(endpoint.url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 400) {
                return alert("Bad request")
            }

            return alert("Something went wrong")
        })
        .then(({ address, days: [{ tempmax, tempmin, temp, humidity, conditions, hours }] }) => {
            if (elements.primaryDetail[0].textContent !== conditions) elements.primaryDetail[0].textContent = conditions
            if (elements.primaryDetail[1].textContent !== address) elements.primaryDetail[1].textContent = address

            setCurrentTemp(temp, tempmax, tempmin, humidity, elements)
            setNextHoursTemp(elements.firstHour, hours, 0, "h-")
            setNextHoursTemp(elements.secondHour, hours, 1, "twoh-")
        })
        .catch(error => {
            console.error(error)
        })
}

export { fetchData }