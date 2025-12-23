import { getIconSource } from "../../utils/iconUtils";
import windArrow from "/src/img/icons/wind-arrow.png";

const ForecastDayCard = ({translation, temperatureSymbol, speedSymbol, data, timezone}) => {
    const hourlyData = data.slice(0, 5);

    const formatTime = (dateString) => {
        const date = new Date((new Date(dateString)).getTime() + timezone * 1000);
        return new Intl.DateTimeFormat(translation.localNameKey, { 
            hour: '2-digit', 
            minute: '2-digit' 
        }).format(date);
    };

    return (
        <div className="forecast-day-card block flex flex-col items-center py-[13px]">
            <h2 className="title text-[32px] font-bold">{translation.hourlyForecast}</h2>
            <div className="flex w-fit gap-[15px] h-full">
                {hourlyData.map((it, index) => {
                    const temp = Math.round(it.main.temp);
                    const windSpeed = Math.round(it.wind.speed);
                    const windDeg = it.wind.deg;
                    const iconCode = it.weather[0].icon;
                    const time = formatTime(it.dt_txt);
                    const hours = new Date((new Date(it.dt_txt)).getTime() + timezone * 1000).getHours();
                    const dayTime = (hours >= 6 && hours < 18) ? 'day' : 'night';

                    return (
                        <div className={"forecast-day-card bg-[var(--color-bg-200)] h-full rounded-[40px] flex flex-col justify-between w-[130px] items-center py-[15px] " + dayTime} key={index}>
                            <p className="time text-[24px] font-bold">{time}</p>
                            <img className="weather-icon icon w-[80px] h-[80px]" src={getIconSource(iconCode,)} />
                            <p className="temperature text-[20px] font-bold">{temp}{temperatureSymbol}</p>
                            <div className="wind-arrow-scontainer w-fit flex justify-center items-center">
                                <img
                                    className="wind-icon icon"
                                    src={windArrow}
                                    style={{ transform: `rotate(${windDeg}deg)` }}
                                />
                            </div>
                            <p className="wind-speed text-[20px] font-bold">{windSpeed}{speedSymbol(translation)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ForecastDayCard;