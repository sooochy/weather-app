const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Cracow";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    if(search.value.length == 0) 
        alert('Please type in a city name');
    else {
        cityInput = search.value;

        fetchWeatherData();

        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});


function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekday[new Date(`${year}/${month}/${day}`).getDay()];
};

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7ed9c537c7654eb0a50210934220904&q=${cityInput}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);
            
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com.weather/64x64/".length);

            icon.src = "./icons/" + iconId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if(!data.current.is_day) 
                timeOfDay = "night";

            switch(code) {
                case 1000:
                    app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                    btn.style.background = "#e5ba92";

                    if(timeOfDay == "night") 
                        btn.style.background = "#181e27";
                    break;
                case 1003:
                case 1006:
                case 1009:
                case 1030: 
                case 1087: 
                case 1135: 
                case 1273: 
                case 1276: 
                case 1279: 
                case 1282:
                    app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                    btn.style.background = "#fa6d1b";

                    if(timeOfDay == "night") 
                        btn.style.background = "#181e27";
                    break;
                case 1063:
                case 1069:
                case 1072:
                case 1150: 
                case 1153: 
                case 1180: 
                case 1183: 
                case 1189: 
                case 1192: 
                case 1195: 
                case 1204:
                case 1207:
                case 1240:
                case 1243:
                case 1246:
                case 1249:
                case 1252:
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    btn.style.background = "#647d75";
                    
                    if(timeOfDay == "night") 
                        btn.style.background = "#325c80";
                    break;
                default:
                    app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                    btn.style.background = "#4d72aa";
                    
                    if(timeOfDay == "night") 
                        btn.style.background = "#1b1b1b";
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";