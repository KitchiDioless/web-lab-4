import { useState, useEffect } from 'react';
import { WeatherService } from '../services/Api';

export const useWeather = (lat, lon, units, lang) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        setLoading(true);
        setError(null);

        const weatherUrl = WeatherService.getCurrentWeatherUrl(lat, lon, units, lang);
        const forecastUrl = WeatherService.getForecastUrl(lat, lon, units, lang);
        const pollutionUrl = WeatherService.getAirPollutionUrl(lat, lon);

        Promise.all([
            fetch(weatherUrl).then(res => res.json()),
            fetch(forecastUrl).then(res => res.json()),
            fetch(pollutionUrl).then(res => res.json())
        ])
        .then(([current, forecast, pollution]) => {
            if (current.cod && Number(current.cod) !== 200) throw new Error(current.message);

            setWeatherData({
                current,
                forecast,
                airQuality: pollution.list ? pollution.list[0] : null
            });
        })
        .catch(err => {
            console.error(err);
            setError("Failed to load weather data");
        })
        .finally(() => {
            setLoading(false);
        });

    }, [lat, lon, units, lang]);

    return { weatherData, loading, error };
};