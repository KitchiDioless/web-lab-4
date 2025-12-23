import humidty from "/src/img/icons/humidity.png"
import windImg from "/src/img/icons/wind.png"
import pressure from "/src/img/icons/pressure.png"
import { useUnits } from "../../hooks/useUnits";

const WeatherMetrics = ({main, wind, translation}) => {
    const { speedSymbol } = useUnits();

    return (
        <div className="weather-metrics">
            <div className="weather-metric humidity">
                <img className="icon icon-filled" src={humidty} alt={translation.humidity} />
                <h3 className="value">{main.humidity}%</h3>
                <p className="name">{translation.humidity}</p>
            </div>
            <div className="weather-metric wind-speed">
                <img className="icon icon-filled" src={windImg} alt={translation.windSpeed} />
                <h3 className="value">{Math.round(wind.speed)}{speedSymbol(translation)}</h3>
                <p className="name">{translation.windSpeed}</p>
            </div>
            <div className="weather-metric pressure">
                <img className="icon icon-filled" src={pressure} alt={translation.pressure} />
                <h3 className="value">{main.pressure}{translation.hpa}</h3>
                <p className="name">{translation.pressure}</p>
            </div>
        </div>
    );
}

export default WeatherMetrics;