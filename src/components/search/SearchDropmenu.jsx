function SearchSuggestions({ suggestions, isLoading, onSelect, translation }) {
    return (
        <div className="absolute top-0 w-full dark:bg-[var(--color-bg-50)] bg-white rounded-[40px] z-10 pt-[70px] pb-[10px] overflow-hidden h-fit themed">
            {!suggestions && (
                <div className="pl-[80px] py-2 dark:text-[var(--color-text)] text-gray-400 themed">
                    { translation.waitingForInput }
                </div>
            )}

            {!isLoading && suggestions && suggestions.length === 0 && (
                <div className="pl-[80px] py-2 dark:text-[var(--color-text)] text-gray-400 themed">
                    { translation.nothingFound }
                </div>
            )}

            {suggestions && isLoading && (
                <div className="pl-[80px] py-2 dark:text-[var(--color-text)] text-gray-400 themed">
                    { translation.searching }
                </div>
            )}

            {!isLoading && suggestions && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((city, index) => (
                        <li 
                            key={`${city.lat}-${city.lon}-${index}`} 
                            onClick={() => onSelect(city)}
                            className="pl-[80px] pr-[40px] py-2 hover:bg-gray-100 dark:hover:bg-[var(--color-bg-100)] cursor-pointer dark:text-[var(--color-text)] text-black text-lg transition-colors flex justify-between items-center themed"
                        >
                            <span className="flex items-center gap-2">
                                {city.local_names?.[translation.localNameKey] || city.name}
                            </span>
                            <span>
                                {city.state && (
                                    <span className="dark:text-[var(--color-text)]/70 text-gray-400 text-sm me-2 themed">
                                        {city.state}
                                    </span>
                                )}
                                <span className="font-bold dark:text-[var(--color-text)]/80 dark:bg-[var(--color-bg-200)] text-gray-500 bg-gray-200 px-[10px] rounded themed">
                                    {city.country}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchSuggestions;