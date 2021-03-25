function formatDates (timestamp) {
    let date = new Dates (timestamp)
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDays()];
    return`${day} ${formatHours(timestamp)}`;
    console.log(date);
}
function formatHours(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {hours = `0${hours}`};
    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`}
    return `${hours}: ${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let discriptionElement = document.querySelector("#discription");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    celciusTemperature.innerHTML = response.data.main.temp;
    cityElement.innerHTML = response.data.name;
    discriptionElement.innerHTML = response.data.weather[0].discription;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDates(response.data.dt * 1000);
    iconElement.setAttribute("src", ``)
}