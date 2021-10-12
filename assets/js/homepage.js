var key = "7f3f0a1f90357c304e6068c79749f336";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weathers-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");

var getWeatherInfo = function(cityname) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + key + "&units=imperial";
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    // console.log(data);
                    displayWeather(data, cityname);
                })
            } else {
                alert("something went terribly wrong");
            }
        })
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    // console.log("clicked");
    var cityname = cityInputEl.value.trim();
        if (cityname) {
            getWeatherInfo(cityname);
            cityInputEl.value = '';
        } else {
            alert("enter a city name bro");
        }
}

var displayWeather = function(data, searchTerm) {
    // console.log(data);
    // console.log(searchTerm);
    // console.log("displayweather works");
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm;
    var currentWeather = document.createElement("div");
    var titleEl= document.createElement("span");
    titleEl.innerHTML = "<h3>"+data.name + data.dt +"</h3>" +
                        "Current Temperature: " + data.main.temp + "&#8457" +
                        "</br> Windspeed: " + data.wind.speed + " mph" +
                        "</br> Humidity: " + data.main.humidity +"%"
                        // "</br> UV index: " +data.uvi;
    ;

    // console.log(data.main);

    currentWeather.appendChild(titleEl);
    // currentWeather.appendChild(windEl);

    weatherContainerEl.appendChild(currentWeather);


}




cityFormEl.addEventListener("submit", formSubmitHandler);