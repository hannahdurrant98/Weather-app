function formatDates (timestamp) {
    let date = new Dates (timestamp)
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDays()];
    return`${day} ${formatHours(timestamp)}`;
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
    iconElement.setAttribute("src", `https://openweather.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].discription);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML= null;
    let forecast = null;
        for (let index=0; index<7; index ++) {
            forecast = response.data.list[index];
            forecastElement.innerHTML+=`
            <div class = "col-4">
                <p2>
                    ${formatHours(forcast.dt * 1000)}
                </p2>
                <img src = "https://openweather.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
                <div class = "weather-forecast-temperature">
                <strong> ${Math.round(forecast.main.temp_max)}°
                </strong> ${Math.round(forecast.main.temp_min)}°
            </div>
            </div> `;
        }
}

function search (city) {
    let apiKey = "90d9f85b35ad3264503f92b46676dc6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiKey).then(displayForecast);
}

function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

function displayfahrenheitTemperature (event){
    event.preventDefault();
    let temperature = document.querySelector("#temperature");

    let fahrenheitTemperature = (celciusTemperature *9)/5+32;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelcuisTemperature(event){
    event.preventDefault();

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-location");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celcuisLink = document.querySelector("#celcuis-link");
celcuisLink.addEventListener("click", displayCelcuisTemperature);

search("New York");