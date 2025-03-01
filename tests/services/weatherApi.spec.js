import { fetchWeatherByCity, fetchWeatherByCoordinates } from '~/utils/weatherApi';

global.fetch = jest.fn(); 

describe('Weather API functions', () => {
    const apiKey = '12345';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchWeatherByCity should fetch weather data successfully', async () => {
        const city = 'London';
        const mockData = {
            main: { temp: 15 },
            weather: [{ description: 'clear sky' }],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const result = await fetchWeatherByCity(city, apiKey);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        expect(result).toEqual(mockData);
    });

    it('fetchWeatherByCity should throw an error when the fetch fails', async () => {
        const city = 'London';

        fetch.mockResolvedValueOnce({ ok: false });

        await expect(fetchWeatherByCity(city, apiKey)).rejects.toThrow('Failed to fetch weather data');
    });

    it('fetchWeatherByCoordinates should fetch weather data successfully', async () => {
        const lat = 51.5074;
        const lon = -0.1278;
        const mockData = {
            main: { temp: 20 },
            weather: [{ description: 'cloudy' }],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const result = await fetchWeatherByCoordinates(lat, lon, apiKey);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        expect(result).toEqual(mockData);
    });

    it('fetchWeatherByCoordinates should throw an error when the fetch fails', async () => {
        const lat = 51.5074;
        const lon = -0.1278;

        fetch.mockResolvedValueOnce({ ok: false });

        await expect(fetchWeatherByCoordinates(lat, lon, apiKey)).rejects.toThrow('Failed to fetch weather data');
    });
});
