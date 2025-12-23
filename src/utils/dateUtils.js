export const getLocalTime = (timezoneOffset) => {
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;

    const cityTime = utc + (timezoneOffset * 1000);
    
    return new Date(cityTime);
};