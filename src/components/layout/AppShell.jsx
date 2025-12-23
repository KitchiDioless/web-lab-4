import CurrentWeatherCard from "../weather/CurrentWeatherCard";
import ForecastCard from "../weather/ForecastCard";
import ForecastList from "../weather/ForecastList";
import Header from "./Header";
import LocationBadge from "../weather/LocationBadge";
import LanguageToggler from "./LanguageToggler";

import { Loader, ErrorState } from "../common/States";

import { useGeolocation } from "../../hooks/useGeolocation";
import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";
import { useWeather } from "../../hooks/useWeather";
import AqiCard from "../weather/AqiCard";

function AppShell() {
    const { selectedCity, setCity } = useGeolocation();
    const { unitSystem, toggleUnits, temperatureSymbol, speedSymbol } = useUnits();
    const { translation, language, setLanguage } = useI18n();

    const { weatherData, loading, error } = useWeather(
        selectedCity.lat,
        selectedCity.lon,
        unitSystem,
        translation.localNameKey
    );

    return (
        <div className="application bg-gradient-to-br from-[var(--color-bg-100)] to-[var(--color-bg-300)] flex flex-col items-center w-full p-[63px] themed relative">
            <Header
                translation={translation}
                toggleUnits={toggleUnits}
                temperatureSymbol={temperatureSymbol}
                setCity={setCity}
            />
            <content className="sized grid grid-cols-[auto_1fr] gap-[55px] gap-y-[51px] min-h-[800px]">
                {loading && (
                    <div className="col-span-2 flex justify-center">
                        <Loader />
                    </div>
                )}

                {!loading && error && (
                    <div className="col-span-2 flex justify-center">
                        <ErrorState message={error} />
                    </div>
                )}

                {!loading && !error && weatherData && (
                    <>
                        <LocationBadge translation={translation} selectedCity={selectedCity} />
                        <CurrentWeatherCard translation={translation} temperatureSymbol={temperatureSymbol} data={weatherData.current} tra />
                        <ForecastList
                            data={weatherData.forecast.list}
                            translation={translation}
                            temperatureSymbol={temperatureSymbol}
                            timezone={selectedCity.timezone}
                        />
                        <ForecastCard
                            translation={translation}
                            data={weatherData.forecast.list}
                            temperatureSymbol={temperatureSymbol}
                            speedSymbol={speedSymbol}
                            timezone={selectedCity.timezone}
                        />
                        <AqiCard 
                            data={weatherData.airQuality}
                            translation={translation} 
                        />
                    </>
                )}

            </content>
            <LanguageToggler language={language} setLanguage={setLanguage} />
        </div>
    );
}

export default AppShell;