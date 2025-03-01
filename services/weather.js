export const fetchWeatherByCity = async (city, apiKey) => {
    try {
        const response = await fetch(
            //`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=4&appid=${apiKey}&units=metric`
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return await response.json();
    } catch (error) {
        throw new Error(error.message || "An error occurred");
    }
};

export const fetchWeatherByCoordinates = async (lat, lon, apiKey) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return await response.json();
    } catch (error) {
        throw new Error(error.message || "An error occurred");
    }
};
