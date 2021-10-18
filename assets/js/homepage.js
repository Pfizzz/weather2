const key = "7f3f0a1f90357c304e6068c79749f336";
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityname");
const weatherContainerEl = document.querySelector("#weathers-container");
const weatherSearchTerm = document.querySelector("#weather-search-term");

const getWeatherInfo = (cityname) => {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + key + "&units=imperial";
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data);
                    displayWeather(data, cityname);
                })
            } else {
                alert("response error with fetching weather data");
        }
    });
    getFiveWeatherInfo(cityname);
};

// function to get five day forecast
const getFiveWeatherInfo = (cityname) => {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + key + "&units=imperial";
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data);
                    displayFiveWeatherData(data, cityname);
                })
            } else {
                alert("response error with get 5-day fetch request")
            }
        })         
};

const formSubmitHandler = (event) => {
    event.preventDefault();
    var cityname = cityInputEl.value.trim();
    if (cityname) {
        getWeatherInfo(cityname);
        cityInputEl.value = '';
    } else {
        alert("Please enter a city name!");
    }
};

const displayWeather = (data, searchTerm) => {
    // console.log(data);
    // console.log(searchTerm);
    // console.log("displayweather works");
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm;
    var currentWeather = document.createElement("div");
    var titleEl = document.createElement("span");
    titleEl.innerHTML = "<h3>" + data.name + data.dt + "</h3>" +
        "Current Temperature: " + data.main.temp + "&#8457" +
        "</br> Windspeed: " + data.wind.speed + " mph" +
        "</br> Humidity: " + data.main.humidity + "%"
        // "</br> UV index: " +data.uvi;
        ;

    // console.log(data.main);

    currentWeather.appendChild(titleEl);
    // currentWeather.appendChild(windEl);

    weatherContainerEl.appendChild(currentWeather);
};

const displayFiveWeatherData = (data, cityname) => {
    console.log("connect to display five day");
    console.log(data);
}




cityFormEl.addEventListener("submit", formSubmitHandler);