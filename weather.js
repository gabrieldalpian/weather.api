const apiKey = 'x';

document.querySelector('#getWeather').addEventListener('click', () => {
    const city = document.querySelector('#city').value; 
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.ok ? response.json() : (() => { throw new Error('City not found') })())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherResult').innerText = error.message;
        });
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
