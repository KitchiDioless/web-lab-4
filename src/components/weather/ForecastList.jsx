import { getIconSource } from "../../utils/iconUtils";

const ForecastList = ({translation, data, temperatureSymbol, timezone}) => {

    const dailyForecast = [];
    const seenDates = new Set();

    const formatDate = (dateString) => {
        const date = new Date((new Date(dateString)).getTime() + timezone * 1000);
        const nDate = new Intl.DateTimeFormat(translation.localNameKey, { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        }).format(date);
        return nDate[0].toUpperCase() + nDate.slice(1);
    };

    (data || []).forEach((item) => {
        const dateStr = item.dt_txt.split(' ')[0];
        if (!seenDates.has(dateStr)) {
            const noonForecast = data.find(d => d.dt_txt.startsWith(dateStr) && d.dt_txt.includes("12:00:00"));
            dailyForecast.push(noonForecast || item);
            seenDates.add(dateStr);
        }
    });

    const finalData = dailyForecast.slice(0, 5);

    return (
        <div className="forecast-list block flex flex-col items-center h-fit py-[20px] pl-[30px] pr-[14px]">
            <h2 className="title font-bold text-[32px] py-[20px] px-[14px]">{translation.forecastList}</h2>
            {finalData.map((it, index) => {
                const temp = Math.round(it.main.temp);
                const iconCode = it.weather[0].icon;
                const date = formatDate(it.dt_txt);
                const imgSrc = getIconSource(iconCode);
                const altText = it.weather[0].description;

                return (
                    <div className="item flex gap-[35px] w-full items-center" key={index}>
                        <img className="icon flex-0 w-[50px] h-[50px] object-contain" alt={altText} src={imgSrc} />
                        <span className="temperature flex-0 text-[24px] font-semibold w-[55px]">{temp}{temperatureSymbol}</span>
                        <div className="span-container flex-1 flex justify-center">
                            <span className="date text-[24px] font-semibold">{date}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ForecastList;