import { fetchData } from "./req"

const elements = {
    searchForm: document.getElementById("search-form").children,
    primaryDetail: document.getElementById("primary-detail").children,
    currentTemp: document.getElementById("temp").children,
    firstHour: document.getElementById("first-hour").children,
    secondHour: document.getElementById("second-hour").children,
}

const endpoint = {
    city: 'London,UK',
    get url() {
        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.city}?unitGroup=us`
    },
    setCity(target) {
        this.city = target.value
    }
}

fetchData(endpoint, elements)

elements.searchForm[2].addEventListener('click', () => {
    if (!elements.searchForm[1].value.trim()) return;

    endpoint.setCity(elements.searchForm[1])

    fetchData(endpoint, elements)
})