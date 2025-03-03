<template>
  <div class="weather-container">
    <div class="back-link">
      <NuxtLink to="/" class="btn btn-secondary">
        <i class="fas fa-arrow-left"></i> Back to Search
      </NuxtLink>
    </div>

    <WeatherViewer :weather="weather" :loading="loading" :error="error" />
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { fetchWeatherByCity } from "~/services/weather";

const route = useRoute();
const config = useRuntimeConfig();
const cityName = route.params.name;
const weather = ref(null);
const loading = ref(false);
const error = ref("");

const fetchCityWeather = async () => {
  try {
    loading.value = true;
    error.value = "";
    weather.value = await fetchWeatherByCity(
      cityName,
      config.public.weatherApiKey
    );
  } catch (err) {
    error.value = err.message;
    weather.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCityWeather();
});
</script>
  
  <style scoped>
.back-link {
  margin-bottom: 20px;
}
</style>