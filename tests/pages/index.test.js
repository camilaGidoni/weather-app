import { mount } from '@vue/test-utils';
import WeatherViewer from '../../components/WeatherViewer.vue';
import { useCitiesStore } from '../../stores/cities.js';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '../../services/weather.js';

jest.mock('../../services/weather.js', () => ({
    fetchWeatherByCity: jest.fn(),
    fetchWeatherByCoordinates: jest.fn(),
}));

jest.mock('../../stores/cities.js', () => ({
    useCitiesStore: jest.fn(),
}));

describe('WeatherViewer.vue', () => {
    let wrapper;
    let storeMock;

    beforeEach(() => {
        storeMock = {
            getSavedCities: [{ name: 'Porto', country: 'PT' }],
        };

        useCitiesStore.mockReturnValue(storeMock);
        wrapper = mount(WeatherViewer, {
            global: {
                mocks: {
                    $config: {
                        public: {
                            weatherApiKey: 'dummy-api-key',
                        },
                    },
                },
            },
        });
    });


    it('should call fetchWeatherByCity when searchByCity is triggered', async () => {
        const city = 'Porto';
        const weatherData = { temperature: 20 };
        fetchWeatherByCity.mockResolvedValue(weatherData);
        await wrapper.vm.searchByCity(city);
        expect(fetchWeatherByCity).toHaveBeenCalledWith(city, 'dummy-api-key');
        expect(wrapper.vm.weather).toBe(weatherData);
    });

    it('should call fetchWeatherByCoordinates when searchByCoordinates is triggered', async () => {
        const coords = { lat: 40.7128, lon: -74.0060 };
        const weatherData = { temperature: 22 };

        fetchWeatherByCoordinates.mockResolvedValue(weatherData);
        await wrapper.vm.searchByCoordinates(coords);
        expect(fetchWeatherByCoordinates).toHaveBeenCalledWith(
            coords.lat,
            coords.lon,
            'dummy-api-key'
        );
        expect(wrapper.vm.weather).toBe(weatherData);
    });


    it('should load weather for the first saved city on mount', async () => {
        const weatherData = { temperature: 20 };
        fetchWeatherByCity.mockResolvedValue(weatherData);
        await wrapper.vm.$nextTick();
        expect(fetchWeatherByCity).toHaveBeenCalledWith('Porto,PT', 'dummy-api-key');
        expect(wrapper.vm.weather).toBe(weatherData);
    });
});
