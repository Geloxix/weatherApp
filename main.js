import './style.css';

const inputCountry = document.getElementById('country');
const submitBtn = document.querySelector('.submit-btn');
const search = document.querySelector('.search');
const img = document.querySelector('.weather-type');

const apiKey = 'cb5cdeb6de9f54818587fb6e74af012a';
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weathers = [
    {
        name: 'Clear',
        image: 'clear.png'
    },
    {
        name: 'Clouds',
        image: 'cloudy.png'
    }, 
    {
        name: 'Rain',
        image: 'rainy.png'
    }, 
    {
        name: 'Snow',
        image: 'snow.png'
    }, 
    {
        name: 'Drizzle',
        image: 'drizzle.png'
    }
];

async function getWeather(city) {
    try {
        const response = await fetch(URL + city + `&appid=${apiKey}`);
        const data = await response.json();

        console.log(data);
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.celsius').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
        document.querySelector('.wind-speed').innerHTML = data.wind.speed + ' km/h';

        weathers.forEach((weath) => {
            if (data.weather[0].main === weath.name) {
                img.src = weath.image;
            }
        })
        
        if (!response.ok) {
            throw new Error("Failed to Fetch Data!");
        }
    } catch (error) {
        console.error(error);
        search.innerHTML = `
            <h1>I Miss You Balik Kana :<</h1>
        `;
    }
} 

submitBtn.addEventListener("click", () => {
    getWeather(inputCountry.value);
});