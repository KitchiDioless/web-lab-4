const API_KEY = import.meta.env.VITE_OWM_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

if (!API_KEY) {
    console.error("API Key for OpenWeatherMap is missing! Check .env file.");
}

export const WeatherService = {
    getGeoUrl: (query) => 
        `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,

    getCurrentWeatherUrl: (lat, lon, units, lang) => 
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`,

    getForecastUrl: (lat, lon, units, lang) => 
        `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`,

    getAirPollutionUrl: (lat, lon) => 
        `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
};