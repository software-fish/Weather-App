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
            max: document.getElementById("h-max-temp"),
            min: document.getElementById("h-min-temp"),
            humid: document.getElementById("h-humid"),
        },
        second: {
            fahrenheit: document.getElementById("twoh-fahrenheit"),
            max: document.getElementById("twoh-max-temp"),
            min: document.getElementById("twoh-min-temp"),
            humid: document.getElementById("twoh-humid"),
        }
    }
}