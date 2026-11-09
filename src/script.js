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

            temperatures.nextHours.first.condition.textContent = `${hours[0].conditions}`
            temperatures.nextHours.first.fahrenheit.textContent = `${hours[0].temp} Fahrenheit`
            temperatures.nextHours.first.humid.textContent = `Humidity: ${hours[0].humidity}`

            temperatures.nextHours.second.condition.textContent = `${hours[1].conditions}`
            temperatures.nextHours.second.fahrenheit.textContent = `${hours[1].temp} Fahrenheit`
            temperatures.nextHours.second.humid.textContent = `Humidity: ${hours[1].humidity}`
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

searchForm.submit.addEventListener('click', () => {
    if (!searchForm["Input Field"].value.trim()) return;

    endpoint.setCity(searchForm["Input Field"])

    fetchData(endpoint)
})