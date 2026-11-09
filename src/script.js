// I use objects here because in my opinion they make it easier for me to navigate
const elements = {
    searchForm: document.getElementById("search-form").children,
    primaryDetail: document.getElementById("primary-detail").children,
    currentTemp: document.getElementById("temp").children,
    firstHour: document.getElementById("first-hour").children,
    secondHour: document.getElementById("second-hour").children,
}

function setCurrentTemp(temp, tempmax, tempmin, humidity, { currentTemp }) {
    Array.from(currentTemp).forEach(element => {
        switch (element.id) {
            case "fahrenheit":
                element.textContent = `${temp} Fahrenheit`
            break

            case "max-temp":
                element.textContent = `Max temp: ${tempmax} Fahrenheit`
            break

            case "min-temp":
                element.textContent = `Min temp: ${tempmin} Fahrenheit`
            break

            case "humid":
                element.textContent = `Humidity: ${humidity}`
            break
        }
    })
}

function setNextHoursTemp(element_hour, hours, index, typeOfHour) {
    Array.from(element_hour).forEach(element => {
        switch (element.id) {
            case `${typeOfHour}conditions`:
                element.textContent = `${hours[index].conditions}`
            break

            case `${typeOfHour}fahrenheit`:
                element.textContent = `${hours[index].temp} Fahrenheit`
            break

            case `${typeOfHour}humid`:
                element.textContent = `Humidity: ${hours[index].humidity}`
            break
        }
    })
}

function fetchData(endpoint) {
    fetch(endpoint.url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            document.body.textContent = "Something went wrong."
        })
        .then(({ address, days: [{ tempmax, tempmin, temp, humidity, conditions, hours }] }) => {
            elements.primaryDetail[0].textContent = conditions
            elements.primaryDetail[1].textContent = address

            setCurrentTemp(temp, tempmax, tempmin, humidity, elements)

            setNextHoursTemp(elements.firstHour, hours, 0, "h-")
            setNextHoursTemp(elements.secondHour, hours, 1, "twoh-")
        })
}

const endpoint = {
    city: 'London,UK',
    get url() {
        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.city}?unitGroup=metric`
    },
    setCity( target ) {
        this.city = target.value
    }
}

fetchData(endpoint)

elements.searchForm[2].addEventListener('click', () => {
    if (!elements.searchForm[1].value.trim()) return;

    endpoint.setCity(elements.searchForm[1])

    fetchData(endpoint)
})