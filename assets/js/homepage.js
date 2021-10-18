const key = "7f3f0a1f90357c304e6068c79749f336";
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityname");
const weatherContainerEl = document.querySelector("#weathers-container");
const weatherSearchTerm = document.querySelector("#weather-search-term");
const fiveDayContainerEl = document.querySelector("#five-day-container");


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
    fiveDayContainerEl.textContent = '';
    const fiveCurrentWeather = document.createElement("div");
    fiveCurrentWeather.innerHTML = `
    `
    fiveDayContainerEl.appendChild(fiveCurrentWeather);
    let dayOne = data.list[0];
    let dayTwo = data.list[8];
    let dayThree = data.list[16];
    let dayFour = data.list[24];
    let dayFive = data.list[32];
    console.log(dayOne, dayTwo, dayThree, dayFour, dayFive);
    // package all days into one array
    let dayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];
    console.log(dayArray[1]);
    // create a loop to go through each 
    for (let i = 0; i < dayArray.length; i++) {
        // create day container
        const dayEl = document.createElement("div");
        dayEl.innerHTML = `
        <p>Humidity</p>` + dayArray[i].main.humidity + ` 
        <p>Temperature:</p>` + dayArray[i].main.temp;
        fiveCurrentWeather.appendChild(dayEl);
    }


};




cityFormEl.addEventListener("submit", formSubmitHandler);