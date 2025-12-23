import { getIconSource } from "../../utils/iconUtils";
import SunCycle from "./SunCycle";
import WeatherMetrics from "./WeatherMetrics";

function CurrentWeatherCard({ data, temperatureSymbol, translation }) {
    const { main, weather, wind, sys } = data;

    const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);

    return (
        <section className="current-weather-card block w-full flex justify-between items-center px-[26px] py-[40px]">
            <div className="first-block flex flex-col items-center">
                <div className="temperature-block mb-[41px] w-[204px]">
                    <h2 className="temperature-now text-[80px] font-bold bg-gradient-to-r from-[var(--color-text)] to-transparent bg-clip-text text-transparent w-fit leading-none">
                        {Math.round(main.temp)}{temperatureSymbol}
                    </h2>
                    <div className="temperature-feels pl-[3px] flex items-center leading-none">
                        <span className="text text-[20px] mr-[10px] font-semibold text-[var(--color-text)/0.8]">
                            {translation.feelsLike}:
                        </span>
                        <span className="value text-[32px] font-semibold text-[var(--color-text)/0.8]">
                            {Math.round(main.feels_like)}<span className="font-bold">{temperatureSymbol}</span>
                        </span>
                    </div>
                </div>
                <SunCycle sys={sys} translation={translation} />
            </div>
            <div className="weater-big-block flex flex-col items-center justify-between h-full max-w-[250px]">
                <img className="icon w-[178px] h-[178px]" alt={description} src={getIconSource(weather[0].icon, 4)} />
                <h2 className="text font-semibold text-[32px] text-center leading-none">{description}</h2>
            </div>
            <WeatherMetrics main={main} wind={wind} translation={translation} />
        </section>
    );
}

export default CurrentWeatherCard;