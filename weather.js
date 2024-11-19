const apiKey = '5a209eba4245b36be61aac6226e310ae';

document.querySelector('#getWeather').addEventListener('click', () => {
    const city = document.querySelector('#city').value; // Use '#' for IDs
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerText = error.message;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    weatherResult.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Weather: ${description}</p>
    `;
}