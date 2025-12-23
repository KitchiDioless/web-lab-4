import { useContext } from "react";

import { createContext, useState } from 'react';

export const GeolocationContext = createContext(undefined);

export const GeolocationProvider = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState({
        lon: 158.6483,
        lat: 53.0452,
        local_names: {
            en: "Petropavlovsk-Kamchatsky",
            ru: "Петропавловск-Камчатский"
        },
        country: "RU",
        timezone: 43200
    });

    const setCity = (cityData) => {
        setSelectedCity((prev) => ({
            ...prev,
            lat: cityData.lat,
            lon: cityData.lon,
            name: cityData.name,
            country: cityData.country,
            local_names: cityData.local_names || {},
            timezone: cityData.timezone || 0 
        }));
    };

    return (
        <GeolocationContext.Provider value={{ selectedCity, setSelectedCity, setCity }}>
            {children}
        </GeolocationContext.Provider>
    );
};

export const useGeolocation = () => {
    const context = useContext(GeolocationContext);
    if (!context) {
        throw new Error('useGeolocation must be used within a GeolocationContext');
    }

    return context;
};