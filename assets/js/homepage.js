var key = "7f3f0a1f90357c304e6068c79749f336";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var getWeatherInfo = function(cityname) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + key;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                })
            } else {
                alert("something went terribly wrong");
            }
        })
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log("clicked");
    var cityname = cityInputEl.value.trim();
        if (cityname) {
            getWeatherInfo(cityname);
            cityInputEl.value = '';
        } else {
            alert("enter a city name bro");
        }
}

var displayWeather = function() {

}




cityFormEl.addEventListener("submit", formSubmitHandler);