import { useI18n } from "../../hooks/useI18n";

export const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[400px]">
            <div className="w-16 h-16 border-4 border-[var(--color-bg-50)] border-t-white rounded-full animate-spin"></div>
        </div>
    );
};

export const ErrorState = ({ message }) => {
    const { translation } = useI18n();

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] text-center">
            <h2 className="text-2xl font-bold mb-2">{translation.error}</h2>
            <p className="opacity-70 max-w-[400px]">{translation.errorDescription}</p>
        </div>
    );
};