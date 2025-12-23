const LanguageToggler = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="absolute right-[25px] up-[20px] flex items-center justify-center w-[50px] h-[35px] dark:bg-[var(--color-bg-50)] bg-white rounded-lg language-toggler"
            title={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
        >
            <span className="text-lg font-bold dark:text-[var(--color-text)] text-gray-800 themed">
                {language === 'en' ? 'EN' : 'RU'}
            </span>
        </button>
    );
}

export default LanguageToggler;