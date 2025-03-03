<template>
  <div>
    <div v-if="weather && weather.list" class="weather-list">
      <WeatherCard
        v-for="(forecast, index) in weather.list"
        :key="index"
        :weather="forecast"
        :loading="loading"
        :error="error"
        :city="weather.city"
      />
    </div>
    <div class="city-actions" v-if="hasWeatherData">
      <button v-if="!isSaved" @click="saveCity" class="btn btn-primary">
        <i class="fas fa-heart"></i> Save City
      </button>
      <button v-else @click="removeCity" class="btn btn-secondary">
        <i class="fas fa-trash"></i> Remove from Saved
      </button>
    </div>
  </div>
</template>
  
  <script setup>
import { computed } from "vue";
import { useCitiesStore } from "~/stores/cities";
import WeatherCard from "./WeatherCard.vue";

const store = useCitiesStore();

const props = defineProps({
  weather: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});
const isSaved = computed(() => {
  if (!props.weather || !props.weather.city) return false;
  return store.isCitySaved(props.weather.city.id);
});
const hasWeatherData = computed(() => {
  return props.weather && props.weather.list && props.weather.list.length > 0;
});
const saveCity = () => {
  if (!props.weather || !props.weather.city) return;
  const city = props.weather.city;
  const cityToSave = {
    id: city.id,
    name: city.name,
    country: city.country,
  };
  store.saveCity(cityToSave);
};

const removeCity = () => {
  if (!props.weather || !props.weather.city) return;
  store.removeCity(props.weather.city.id);
};
</script>
  
<style scoped>
</style>