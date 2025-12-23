import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const UnitsContext = createContext(undefined);

export const UnitsProvider = ({ children }) => {
    const [unitSystem, setUnitSystem] = useLocalStorage('weather_units', 'metric');

    const toggleUnits = () => {
        setUnitSystem((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
    };

    const temperatureSymbol = unitSystem === 'metric' ? '°C' : '°F';
    const speedSymbol = (traslation) => unitSystem === 'metric' ? traslation.kmh : traslation.mph;

    return (
        <UnitsContext.Provider value={{ unitSystem, toggleUnits, temperatureSymbol, speedSymbol }}>
            {children}
        </UnitsContext.Provider>
    );
};

export const useUnits = () => {
    const context = useContext(UnitsContext);

    if (!context) {
        throw new Error('useUnits must be used within a UnitsProvider');
    }

    return context;
};