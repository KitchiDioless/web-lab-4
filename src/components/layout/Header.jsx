import SearchBar from "../search/SearchBar";
import ThemeToggler from "./ThemeToggler";
import UnitsToggler from "./UnitsToggler";

const Header = ({ translation, toggleUnits, temperatureSymbol, setCity }) => {
    return (
        <header className="flex justify-between sized mb-[47px]">
            <ThemeToggler translation={translation} />
            <SearchBar translation={translation} setCity={setCity} />
            <UnitsToggler toggleUnits={toggleUnits} temperatureSymbol={temperatureSymbol} />
        </header>
    );
}

export default Header;