
const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const status = document.querySelector("#status");
const weatherCard = document.querySelector("#weather-card");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) return;

    status.textContent = "Loading weather...";
    weatherCard.hidden = true;

    try {
        // Find the city's coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find the city right now.");
        }

        const geoData = await geoResponse.json();
        const location = geoData.results?.[0];

        if (!location) {
            throw new Error("City not found. Try another name.");
        }

        // Get weather using latitude and longitude
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to load weather.");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        document.querySelector("#city-name").textContent =
            `${location.name}, ${location.country}`;

        document.querySelector("#temperature").textContent =
            `${current.temperature_2m}°C`;

        document.querySelector("#condition").textContent =
            getWeatherCondition(current.weather_code);

        document.querySelector("#humidity").textContent =
            `Humidity: ${current.relative_humidity_2m}%`;

        document.querySelector("#wind").textContent =
            `Wind: ${current.wind_speed_10m} km/h`;

        weatherCard.hidden = false;
        status.textContent = "";

    } catch (error) {
        status.textContent = error.message;
    }
});

function getWeatherCondition(code) {
    if (code === 0) return "Clear sky ☀️";
    if ([1, 2, 3].includes(code)) return "Partly cloudy ☁️";
    if ([45, 48].includes(code)) return "Foggy 🌫️";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle 🌦️";
    if ([61, 63, 65, 66, 67].includes(code)) return "Rain 🌧️";
    if ([71, 73, 75, 77].includes(code)) return "Snow ❄️";
    if ([80, 81, 82].includes(code)) return "Rain showers 🌧️";
    if ([85, 86].includes(code)) return "Snow showers ❄️";
    if ([95, 96, 99].includes(code)) return "Thunderstorm ⛈️";

    return "Weather information unavailable";
}
