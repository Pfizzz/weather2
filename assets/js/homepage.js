const key = "7f3f0a1f90357c304e6068c79749f336";
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityname");
const weatherContainerEl = document.querySelector("#weathers-container");
const weatherSearchTerm = document.querySelector("#weather-search-term");
const fiveDayContainerEl = document.querySelector("#five-day-container");
const savedCityEl = document.querySelector("#saved-cities");
const clearButton = document.querySelector("#clear");


const loadPage = () => {
        let savedCities = JSON.parse(window.localStorage.getItem("cityname")) || [];
        // write a for loop to iterate through this
        for (let i = 0; i < savedCities.length; i++) {
            console.log(savedCities[i].name);
            const loadButton = document.createElement("button");
            loadButton.textContent = savedCities[i].name;
            loadButton.classList = 'btn white-text';
            savedCityEl.appendChild(loadButton);

        }
        // const scoreBox = document.createElement("div");
        // scoreBox.classList = "center-align";
        // scoreBox.innerHTML = ``;
        // scoreEl.appendChild(scoreBox);
        // console.log(highscores);
}

const loadCityHandler = (e) => {
    var cityname = e.textContent;
    getWeatherInfo(cityname);
}

// clear local storage
const clearStorage = () => {
    window.localStorage.removeItem("cityname");
    window.location.reload();
}

const getWeatherInfo = (cityname) => {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + key + "&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

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
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + key + "&units=imperial";
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
        // send to generateButton function
        generateButton(cityname);
        // local storage,
        var cityName =
        JSON.parse(window.localStorage.getItem("cityname")) || [];
        const userDataObj = {
          name: cityname
        }
        cityName.push(userDataObj);
        window.localStorage.setItem("cityname", JSON.stringify(cityName));

        cityInputEl.value = '';
    } else {
        alert("Please enter a city name!");
    }
};

// create function to generate button in saved cities
const generateButton = (cityname) => {
    console.log(cityname);
    savedCityEl.classList = '';
    const cityButtonWr = document.createElement("div");
    savedCityEl.appendChild(cityButtonWr);
    const cityButton = document.createElement("button");
    cityButton.classList = "btn white-text";
    cityButton.textContent = cityname;
    cityButtonWr.appendChild(cityButton);

}

const displayWeather = (data, searchTerm) => {
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = '';
    var currentWeather = document.createElement("div");
    var titleEl = document.createElement("span");

    var timezone = data.timezone;
    // console.log(timezone);
    d = new Date()
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var algo = utc + (1000 * timezone)
    nd = new Date(algo)

    var description = data.weather[0].description;

    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // console.log(iconurl);
    const {icon} = data.weather[0];
    titleEl.innerHTML = 
        "<h3>" + data.name + ", " + data.sys.country + "</h3>" + "<br/>" + 
        nd + "<br/>" +
        `<div class=""><img src="assets/icons/${icon}.png" /></div>` +
        "Currently: " + description + "<br/>" +
    
        "Temperature: " + data.main.temp + "&#8457" + "<br/>" +
        "Windspeed: " + data.wind.speed + " mph" + "<br/>" +
        "Humidity: " + data.main.humidity + "%"
        ;
        let locationIcon = document.querySelector('.weather-icon');

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
    // console.log(dayOne, dayTwo, dayThree, dayFour, dayFive);
    // package all days into one array
    let dayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

 
    console.log(dayArray[1]);
    // create a loop to go through each 
    for (let i = 0; i < dayArray.length; i++) {
        let timeMil = dayArray[i].dt;
        // console.log(timeMil.toString());
        var day = dayjs.unix(timeMil);
        var editDay = dayjs(day).format('MM/DD/YYYY');

        const iconCode = dayArray[i].weather[0].icon;
        console.log(iconCode);


        // var icon = weather.icon;

        // create day container
        const dayEl = document.createElement("div");
        dayEl.classList = "col s2 center-align";
        dayEl.innerHTML = 
        "<div class='card-wrapper row center-align z-depth-4 blue lighten-4 '>" +
        editDay + `
        <div class="weather-icon responsive-img"><img src="assets/icons/${iconCode}.png" /></div>` + `
        <span>Temp: </span>` + dayArray[i].main.temp + "<br/>" + `
        <span>Wind: </span>` + dayArray[i].wind.speed + "<br/>" + ` 
        <span>Humidity :</span>` + dayArray[i].main.humidity + "</div>";
        fiveCurrentWeather.appendChild(dayEl);
    }
};

loadPage();

clearButton.addEventListener("click", clearStorage);
cityFormEl.addEventListener("submit", formSubmitHandler);
savedCityEl.addEventListener("click", (e) => {
    loadCityHandler(e.target);
})