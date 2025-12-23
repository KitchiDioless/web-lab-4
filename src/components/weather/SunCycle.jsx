import sunrise from "/src/img/icons/sunrise.png";
import sunset from "/src/img/icons/sunset.png";

const SunCycle = ({sys, translation}) => {
    const formatTime = (time) => {
        const date = new Date(time * 1000);
        return new Intl.DateTimeFormat(translation.localNameKey, { 
            hour: '2-digit', 
            minute: '2-digit' 
        }).format(date);
    };

    return (
        <div className="sun-cycle grid grid-cols-1 gap-y-[13px] w-full">
            <div className="sun-time sunrise">
                <img className="icon icon-filled" alt="Sunrise" src={sunrise} />
                <div className="text-block">
                    <h3 className="name">{translation.sunrise}</h3>
                    <p className="time">{formatTime(sys.sunrise)}</p>
                </div>
            </div>
            <div className="sun-time sunset">
                <img className="icon icon-filled" alt="Sunset" src={sunset} />
                <div className="text-block">
                    <h3 className="name">{translation.sunset}</h3>
                    <p className="time">{formatTime(sys.sunset)}</p>
                </div>
            </div>
        </div>
    );
}

export default SunCycle;