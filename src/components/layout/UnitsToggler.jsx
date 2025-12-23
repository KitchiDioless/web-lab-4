
const UnitsToggler = ({ toggleUnits, temperatureSymbol }) => {
    return (
        <button onClick={toggleUnits} className="ms-button bg-[var(--color-bg-50)] rounded-[40px] min-w-[80px]">
            <span className="text font-bold text-[22px]">{temperatureSymbol}</span>
        </button>
    );
}

export default UnitsToggler;