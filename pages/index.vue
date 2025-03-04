<template>
  <div class="weather-container">
    <h1 class="page-title">Weather Forecast</h1>

    <SearchForm
      @search="searchByCity"
      @current-location="searchByCoordinates"
    />
    <WeatherViewer :weather="weather" :loading="loading" :error="error" />
    <CityList :cities="savedCities" />
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useCitiesStore } from "~/stores/cities";
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from "~/services/weather";

const config = useRuntimeConfig();
const store = useCitiesStore();
const weather = ref([]);
const loading = ref(false);
const error = ref("");

const savedCities = computed(() => {
  return store.getSavedCities;
});

const searchByCity = async (city) => {
  try {
    loading.value = true;
    error.value = "";
    weather.value = await fetchWeatherByCity(city, config.public.weatherApiKey);
  } catch (err) {
    error.value = err.message;
    weather.value = [];
  } finally {
    loading.value = false;
  }
};
const searchByCoordinates = async ({ lat, lon }) => {
  try {
    loading.value = true;
    error.value = "";
    weather.value = await fetchWeatherByCoordinates(
      lat,
      lon,
      config.public.weatherApiKey
    );
  } catch (err) {
    error.value = err.message;
    weather.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (savedCities.value.length > 0) {
    const firstCity = savedCities.value[0];
    await searchByCity(`${firstCity.name},${firstCity.country}`);
  }
});
</script>

  
  <style scoped>
.page-title {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 2.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}
</style>