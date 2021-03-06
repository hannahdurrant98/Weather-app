//Current date and time
function formatDate(timestamp) {
    let date = new Date (timestamp)
    let number = date.getDate();
    let hours = date.getHours();
    if (hours < 10) {hours = `0${hours}`}; 
    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`};
    
    let months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November"]
    let month = months[date.getMonth()];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${number} ${month}, ${hours}:${minutes}`;    
}
 // Timestamp of location
function formatHours(timestamp){
    let date = new Date (timestamp)
    let hours = date.getHours();
    if (hours < 10) {hours = `0${hours}`}; 
    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`};
    
    return `${hours}:${minutes}`;

}
// Loactions weather details
function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let discriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    discriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
// Changes icons
function displayForecast(response){      
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {

    forecast = response.data.list[index];  

    forecastElement.innerHTML += `   
    <div class="col-2">
      <h5>
        ${formatHours(forecast.dt * 1000)}
      </h5>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          Max: ${Math.round(forecast.main.temp_max)}??
        </strong></br>
        Min: ${Math.round(forecast.main.temp_min)}??
      </div>
    </div>
        `
    } 
}
// API Location
function searchCity(city){
    let apiKey = "90d9f85b35ad3264503f92b46676dc6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}
// Location button
function showPosition(position){
    let apiKey = "90d9f85b35ad3264503f92b46676dc6c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    apiUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

// Search bar when nothing is entered 
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    let city = document.querySelector("#city");
    let h1 = document.querySelector("h1");
    if (cityInputElement.value) {
        city.innerHTML = `${cityInputElement.value}`;
    } else {
        h1.innerHTML = `Please enter a city`;
    }    
    searchCity(cityInputElement.value);
}
// Current location
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
// Changes celsius temperature to fahrenheit
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 // Displays celsius temperature
function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPosition);

navigator.geolocation.getCurrentPosition(showPosition);

searchCity("London");