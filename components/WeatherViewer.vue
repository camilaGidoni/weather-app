<template>
  <div>
    <WeatherCard :weather="weather" :loading="loading" :error="error" />
    <div class="city-actions" v-if="weather !== null">
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
  if (!props.weather) return false;
  return store.isCitySaved(props.weather.id);
});

const saveCity = () => {
  if (!props.weather) return;

  const cityToSave = {
    id: props.weather.id,
    name: props.weather.name,
    country: props.weather.sys.country,
  };

  store.saveCity(cityToSave);
};

const removeCity = () => {
  if (!props.weather) return;
  store.removeCity(props.weather.id);
};
</script>
  
<style scoped>
</style>