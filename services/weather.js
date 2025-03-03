// Fetch weather forecast data by city
export const fetchWeatherByCity = async (city, apiKey) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        const uniqueData = processWeatherData(data);

        return uniqueData;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching weather data.");
    }
};

export const fetchWeatherByCoordinates = async (lat, lon, apiKey) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        const uniqueData = processWeatherData(data);

        return uniqueData;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching weather data.");
    }
};

const processWeatherData = (data) => {
    if (data && Array.isArray(data.list)) {
        data.list = getUniqueForecasts(data.list);
    }
    return data;
};

const getUniqueForecasts = (data) => {
    const uniqueForecasts = [];
    const seenDates = new Set();

    data.forEach(item => {
        const date = item.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD

        if (!seenDates.has(date)) {
            seenDates.add(date);
            uniqueForecasts.push(item);
        }
    });

    return uniqueForecasts;
};
