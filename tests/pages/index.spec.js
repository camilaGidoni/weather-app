import { mount } from '@vue/test-utils';
import WeatherViewer from '~/components/WeatherViewer.vue'; // Adjust the path as needed
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '~/services/weather';
import { useCitiesStore } from '~/stores/cities';

jest.mock('~/services/weather', () => ({
    fetchWeatherByCity: jest.fn(),
    fetchWeatherByCoordinates: jest.fn(),
}));

jest.mock('~/stores/cities', () => ({
    useCitiesStore: jest.fn(),
}));

describe('WeatherViewer Component', () => {
    let wrapper;

    beforeEach(() => {
        fetchWeatherByCity.mockClear();
        fetchWeatherByCoordinates.mockClear();
        useCitiesStore.mockReturnValue({
            getSavedCities: [{ name: 'Porto', country: 'Portugal' }],
        });

        wrapper = mount(WeatherViewer, {
            global: {
                mocks: {
                    $config: { public: { weatherApiKey: 'mock-api-key' } },
                },
            },
        });
    });

    it('calls searchByCity with the correct city when mounted', async () => {
        const firstCity = 'Porto,Portugal';
        fetchWeatherByCity.mockResolvedValueOnce({ temp: 20 });

        await wrapper.vm.$nextTick();

        expect(fetchWeatherByCity).toHaveBeenCalledWith(firstCity, 'mock-api-key');
        expect(wrapper.vm.weather).toEqual({ temp: 20 });
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.vm.error).toBe('');
    });

    it('correctly handles searchByCity errors', async () => {
        fetchWeatherByCity.mockRejectedValueOnce(new Error('Failed to fetch weather data'));

        await wrapper.vm.searchByCity('InvalidCity');

        expect(fetchWeatherByCity).toHaveBeenCalledWith('InvalidCity', 'mock-api-key');
        expect(wrapper.vm.weather).toBeNull();
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.vm.error).toBe('Failed to fetch weather data');
    });

    it('calls searchByCoordinates when geolocation is triggered', async () => {
        const mockCoordinates = { lat: 40.7128, lon: -74.0060 };
        fetchWeatherByCoordinates.mockResolvedValueOnce({ temp: 25 });

        await wrapper.vm.searchByCoordinates(mockCoordinates);

        expect(fetchWeatherByCoordinates).toHaveBeenCalledWith(
            mockCoordinates.lat,
            mockCoordinates.lon,
            'mock-api-key'
        );
        expect(wrapper.vm.weather).toEqual({ temp: 25 });
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.vm.error).toBe('');
    });
    it('displays weather data when available', async () => {
        fetchWeatherByCity.mockResolvedValueOnce({ temp: 22 });

        await wrapper.vm.searchByCity('Porto');

        expect(wrapper.vm.weather).toEqual({ temp: 22 });
        expect(wrapper.find('.weather-container').text()).toContain('22');
    });
});
