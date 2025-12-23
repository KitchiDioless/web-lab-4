import { useState } from 'react';
import { useForm } from 'react-hook-form';
import searchIcon from "/src/img/icons/search.png";
import { useDebounce } from '../../hooks/useDebounce';
import { useFetchJson } from '../../hooks/useFetchJson';
import { WeatherService } from '../../services/Api';
import SearchDropmenu from './SearchDropmenu';

const SearchBar = ({ translation, setCity }) => {
    const { register, watch, setValue } = useForm();
    const [isFocused, setIsFocused] = useState(false);

    const searchQuery = watch("searchQuery");
    const debouncedQuery = useDebounce(searchQuery, 500);

    const searchUrl = (debouncedQuery && debouncedQuery.length > 2)
        ? WeatherService.getGeoUrl(debouncedQuery) 
        : null;

    const { data: suggestions, loading } = useFetchJson(searchUrl);

    const handleSelect = (city) => {
        setValue("searchQuery", `${city.name}, ${city.country}`);
        setIsFocused(false);
        setCity(city);
    };

    return (
        <div className='relative w-[1100px] mx-[20px]'>
            <div className="search flex justify-between items-center pl-[33px] pr-[40px] rounded-[40px] h-[62px] bg-white relative z-20">
                <img className="search-icon w-[40px] h-[46px] mr-[30px]" src={searchIcon} alt="Search"/>
                
                <input 
                    id="searchInput"
                    autoComplete="off"
                    className="bg-transparent w-full border-none outline-none placeholder-[var(--color-placeholder)]" 
                    type="text" 
                    placeholder={translation.searchPlaceholder}
                    
                    {...register("searchQuery")}

                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
            </div>
    
            {
                isFocused &&
                searchQuery?.length > 0 &&
                <SearchDropmenu 
                    suggestions={suggestions} 
                    isLoading={loading}
                    onSelect={handleSelect}
                    translation={translation}
                />
            }
        </div>
    );
}

export default SearchBar;