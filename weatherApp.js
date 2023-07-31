/*let weatherData = {
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "tz_id": "Europe/London",
        "localtime_epoch": 1689078036,
        "localtime": "2023-07-11 13:20"
    },
    "current": {
        "last_updated_epoch": 1689077700,
        "last_updated": "2023-07-11 13:15",
        "temp_c": 22.0,
        "temp_f": 71.6,
        "is_day": 1,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
        },
        "wind_mph": 15.0,
        "wind_kph": 24.1,
        "wind_degree": 220,
        "wind_dir": "SW",
        "pressure_mb": 1009.0,
        "pressure_in": 29.8,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 57,
        "cloud": 75,
        "feelslike_c": 24.0,
        "feelslike_f": 75.3,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 6.0,
        "gust_mph": 17.0,
        "gust_kph": 27.4
    }
};*/

let placeRef = document.querySelector('.basic-detail .name-date .place');
let textRef = document.querySelector('.basic-detail .name-date .text');
let dateRef = document.querySelector('.basic-detail .name-date .date');
let tempRef = document.querySelector('.weather-condition .temperature');
let humidityRef = document.querySelector('.weather-condition .humidity');
let imgRef = document.querySelector('.basic-detail .image-div img');


function dateTimeSplitter(time){
    let timeArr = time.split(' ');
    return timeArr;
}

function renderWeatherData(weatherData){
    placeRef.innerText = weatherData.location.name;
    tempRef.innerText = `Temperature: ${weatherData.current.temp_c}°C`;
    dateRef.innerText = dateTimeSplitter(weatherData.location.localtime)[0];
    imgRef.src = weatherData.current.condition.icon;
    textRef.innerText = weatherData.current.condition.text;
    humidityRef.innerText = `Humidity : ${weatherData.current.humidity}%`;
}

let formRef = document.querySelector('.main-container .search form');

formRef.addEventListener('submit' , (e) => {
    e.preventDefault();
    const inputRef = document.querySelector('input.search-field');
    let inputValue = inputRef.value;
    console.log('inputValue');
    fetchWeatherData(inputValue);
    inputRef.value = '';
});

function fetchWeatherData(location){
    fetch(`http://api.weatherapi.com/v1/current.json?key=6a4758bf3eda441994595626231107&q=${location}&aqi=no`)
    .then((res) => res.json())
    .then((weatherData) => renderWeatherData(weatherData))
    .catch((err) => console.log('Error ', err));
}
