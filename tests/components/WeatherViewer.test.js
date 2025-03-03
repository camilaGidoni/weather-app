import { mount } from '@vue/test-utils'
import WeatherCard from '../../components/WeatherCard.vue'
import { useCitiesStore } from '../../stores/cities'

jest.mock('../../stores/cities', () => ({
    useCitiesStore: jest.fn(),
}))

describe('WeatherCard', () => {
    let storeMock

    beforeEach(() => {
        storeMock = {
            isCitySaved: jest.fn(),
            saveCity: jest.fn(),
            removeCity: jest.fn(),
        }
        useCitiesStore.mockReturnValue(storeMock)
    })

    it('calls saveCity when the Save City button is clicked', async () => {
        const weather = { id: 1, name: 'Porto', sys: { country: 'PT' } }
        storeMock.isCitySaved.mockReturnValue(false)

        const wrapper = mount(WeatherCard, {
            props: { weather, loading: false, error: '' },
            global: {
                plugins: [],
            },
        })

        const saveButton = wrapper.find('.btn.btn-primary')
        await saveButton.trigger('click')

        expect(storeMock.saveCity).toHaveBeenCalledWith({
            id: weather.id,
            name: weather.name,
            country: weather.sys.country,
        })
    })

    it('calls removeCity when the Remove from Saved button is clicked', async () => {
        const weather = { id: 1, name: 'Porto', sys: { country: 'PT' } }
        storeMock.isCitySaved.mockReturnValue(true)

        const wrapper = mount(WeatherCard, {
            props: { weather, loading: false, error: '' }
        })

        const removeButton = wrapper.find('.btn.btn-secondary')
        await removeButton.trigger('click')

        expect(storeMock.removeCity).toHaveBeenCalledWith(weather.id)
    })
})
