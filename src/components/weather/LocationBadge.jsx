
import { useState, useEffect } from 'react';

const LocationBadge = ({translation, selectedCity}) => {
    const timezoneOffset = selectedCity.timezone || 0;

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const updateTime = () => {
            const cityDate = getLocalTime(timezoneOffset);
            setDate(cityDate);
        };

        updateTime();
        
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, [timezoneOffset]);

    const timeString = new Intl.DateTimeFormat(translation.locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    let weekday = new Intl.DateTimeFormat(translation.locale, { weekday: 'long' }).format(date);
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const day = new Intl.DateTimeFormat(translation.locale, { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat(translation.locale, { month: 'short' }).format(date);
    
    const dateString = `${weekday}, ${day} ${month}`;

    function getLocalTime(offset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (offset * 1000));
    }

    return (
        <section className="location-badge block flex flex-col justify-center items-center px-[20px]">
            <h3 className="city-name font-bold text-[36px] mb-[72px] w-fit max-w-full break-words leading-tight text-center">
                {selectedCity.local_names[translation.localNameKey] || selectedCity.name}
            </h3>
            <h2 className="time font-bold text-[96px] leading-none">{timeString}</h2>
            <p className="date mt-0 pt-0">{dateString}</p>
        </section>
    );
}

export default LocationBadge;