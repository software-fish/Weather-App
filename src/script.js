// I use objects here because in my opinion they make it easier for me to navigate
const elements = {
    searchForm: document.getElementById("search-form").children,
    primaryDetail: document.getElementById("primary-detail").children,
    currentTemp: document.getElementById("temp").children,
    firstHour: document.getElementById("first-hour").children,
    secondHour: document.getElementById("second-hour").children,
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
            primaryDetail.condition.textContent = conditions
            primaryDetail.address.textContent = address

            temperatures.currentTemp.fahrenheit.textContent = `${temp} Fahrenheit`
            temperatures.currentTemp.max.textContent = `Max temp: ${tempmax} Fahrenheit`
            temperatures.currentTemp.min.textContent = `Min temp: ${tempmin} Fahrenheit`
            temperatures.currentTemp.humid.textContent = `Humidity: ${humidity}`

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