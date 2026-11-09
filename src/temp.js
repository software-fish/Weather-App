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

export { setCurrentTemp, setNextHoursTemp }