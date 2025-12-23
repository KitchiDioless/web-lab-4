import { createContext, useContext } from 'react';
import { translations } from '../i18n/translations';
import { useLocalStorage } from './useLocalStorage';

const I18nContext = createContext(undefined);

export const I18nProvider = ({ children }) => {
    const [language, setLanguage] = useLocalStorage('weather_lang', 'en');

    const translation = translations[language];

    return (
        <I18nContext.Provider value={{ language, setLanguage, translation }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};