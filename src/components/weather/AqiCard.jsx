
const AqiCard = ({ data, translation }) => {
    if (!data) return null;

    const aqiData = data.list ? data.list[0] : data; 
    
    const { aqi } = aqiData.main;
    const { pm2_5, pm10, no2, so2, o3, co } = aqiData.components;

    return (
        <div className="aqi-card block col-span-2 px-[40px] py-[30px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="title font-bold text-[32px]">{translation.airQuality || "Air Quality"}</h2>
                <div className="aqi-annotation">
                    AQI {aqi}
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <GasItem name="PM2.5" value={pm2_5} />
                <GasItem name="PM10" value={pm10} />
                <GasItem name="SO₂" value={so2} />
                <GasItem name="NO₂" value={no2} />
                <GasItem name="O₃" value={o3} />
                <GasItem name="CO" value={co} />
            </div>
        </div>
    );
};

const GasItem = ({ name, value }) => (
    <div className="flex flex-col items-center p-3 bg-[var(--color-bg-100)] rounded-[20px]">
        <span className="text-sm opacity-60 mb-1">{name}</span>
        <span className="text-xl font-bold">{Math.round(value)}</span>
    </div>
);

export default AqiCard;