// I use objects here because in my opinion they make it easier for me to navigate

const searchForm = {
    parent: document.getElementById("search-form"),
    "Input Field": document.getElementById("search-city"),
    submit: document.getElementById("submit-city"),
}

const primaryDetail = {
    condition: document.getElementById("condition"),
    address: document.getElementById("address"),
}

const temperatures = {
    currentTemp: {
        fahrenheit: document.getElementById("fahrenheit"),
        max: document.getElementById("max-temp"),
        min: document.getElementById("min-temp"),
        humid: document.getElementById("humid"),
    },
    nextHours: {
        first: {
            fahrenheit: document.getElementById("h-fahrenheit"),
            humid: document.getElementById("h-humid"),
            condition: document.getElementById('h-conditions')
        },
        second: {
            fahrenheit: document.getElementById("twoh-fahrenheit"),
            humid: document.getElementById("twoh-humid"),
            condition: document.getElementById('twoh-conditions')
        }
    }
}

let city = 'London,UK'
let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric`

fetch(url)
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