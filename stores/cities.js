import { defineStore } from 'pinia';

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        loading: false,
        error: null
    }),

    getters: {
        getSavedCities: (state) => state.cities,
        isCitySaved: (state) => (cityId) => {
            return state.cities.some(city => city.id === cityId);
        }
    },

    actions: {
        initializeStore() {
            const savedCities = localStorage.getItem('savedCities');
            if (savedCities) {
                this.cities = JSON.parse(savedCities);
            }
        },

        saveCity(city) {
            if (!this.cities.some(c => c.id === city.id)) {
                this.cities.push(city);
                localStorage.setItem('savedCities', JSON.stringify(this.cities));
            }
        },

        removeCity(cityId) {
            this.cities = this.cities.filter(city => city.id !== cityId);
            localStorage.setItem('savedCities', JSON.stringify(this.cities));
        }
    }
});