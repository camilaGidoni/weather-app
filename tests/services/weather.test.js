import { fetchWeatherByCity, fetchWeatherByCoordinates } from '../../services/weather';

global.fetch = jest.fn();
describe('Weather API Functions', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('fetchWeatherByCity - success', async () => {
        const mockResponse = {
            weather: [{ description: 'clear sky' }],
            main: { temp: 25 },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const city = 'Porto';
        const apiKey = 'mockApiKey';
        const data = await fetchWeatherByCity(city, apiKey);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        expect(data).toEqual(mockResponse);
    });

    test('fetchWeatherByCity - failure (non-200 response)', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Failed to fetch weather data',
        });

        const city = 'Porto';
        const apiKey = 'mockApiKey';

        await expect(fetchWeatherByCity(city, apiKey)).rejects.toThrow('Failed to fetch weather data');
    });

    test('fetchWeatherByCoordinates - success', async () => {
        const mockResponse = {
            weather: [{ description: 'clear sky' }],
            main: { temp: 25 },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const lat = 41.1579;
        const lon = -8.6291;
        const apiKey = 'mockApiKey';
        const data = await fetchWeatherByCoordinates(lat, lon, apiKey);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        expect(data).toEqual(mockResponse);
    });

    test('fetchWeatherByCoordinates - failure (non-200 response)', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Failed to fetch weather data',
        });

        const lat = 41.1579;
        const lon = -8.6291;
        const apiKey = 'mockApiKey';

        await expect(fetchWeatherByCoordinates(lat, lon, apiKey)).rejects.toThrow('Failed to fetch weather data');
    });

    test('fetchWeatherByCity - error handling', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        const city = 'Porto';
        const apiKey = 'mockApiKey';

        await expect(fetchWeatherByCity(city, apiKey)).rejects.toThrow('Network Error');
    });

    test('fetchWeatherByCoordinates - error handling', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        const lat = 41.1579;
        const lon = -8.6291;
        const apiKey = 'mockApiKey';

        await expect(fetchWeatherByCoordinates(lat, lon, apiKey)).rejects.toThrow('Network Error');
    });
});
