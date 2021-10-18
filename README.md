# Accu-Dash

* An weather app made with javascript, Materialize css, and the Open Weather One Call API.
* Live link: https://pfizzz.github.io/weather2/

![image](https://github.com/Pfizzz/weather2/blob/887bb80d1064efe1ab5cf8bb1c85da87de737bc9/assets/images/ss1.png)

## Version 2.0

This app allows the user to enter a city anywhere in the world to view the current weather and the upcoming 5-day forecast.

The app dynamically generates html by fetching and processing data from the One Call API database. 

Using the localStorage() API, data persists after the user's session, and previously viewed queries are saved to a column and populated on reload for convenience. If the UI becomes too cluttered, the user may clear the application's history.

## What's new

* This is a resubmission. The original, non-functional app's repo may be viewed at https://github.com/Pfizzz/weatherDash.
* The One Call API's UV feature appears to be broken. Although making queries using latitude and longitutde returned the targetted piece of data, no atter where I search, the UVI is always zero. 

![image](https://github.com/Pfizzz/weather2/blob/887bb80d1064efe1ab5cf8bb1c85da87de737bc9/assets/images/ss3.png)

For example, it is unlikely that the UVI in Sydney is zero.

![image](https://github.com/Pfizzz/weather2/blob/887bb80d1064efe1ab5cf8bb1c85da87de737bc9/assets/images/ss2.png)

And here is Spain. I have console.logs rigged to display each location's data, but I have forgone including the function in my HTML, as I believe it is broken.
