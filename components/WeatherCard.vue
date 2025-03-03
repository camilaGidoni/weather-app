<template>
  <div class="weather-viewer card" v-if="weather">
    <div class="weather-header">
      <h2>{{ city.name }}, {{ city.country }}</h2>
      <p class="weather-date">{{ formatDate(weather.dt) }}</p>
    </div>

    <div class="weather-main">
      <div class="weather-temp">{{ Math.round(weather.main.temp) }}°C</div>
      <div class="weather-icon-wrap">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].description"
          class="weather-icon"
        />
        <div class="weather-description">
          {{ weather.weather[0].description }}
        </div>
      </div>
    </div>

    <div class="weather-details">
      <div class="weather-detail-item">
        <i class="fas fa-temperature-high weather-detail-icon"></i>
        <span>Feels Like</span>
        <strong>{{ Math.round(weather.main.feels_like) }}°C</strong>
      </div>

      <div class="weather-detail-item">
        <i class="fas fa-tint weather-detail-icon"></i>
        <span>Humidity</span>
        <strong>{{ weather.main.humidity }}%</strong>
      </div>

      <div class="weather-detail-item">
        <i class="fas fa-wind weather-detail-icon"></i>
        <span>Wind Speed</span>
        <strong>{{ Math.round(weather.wind.speed * 3.6) }} km/h</strong>
      </div>

      <div class="weather-detail-item">
        <i class="fas fa-compress-arrows-alt weather-detail-icon"></i>
        <span>Pressure</span>
        <strong>{{ weather.main.pressure }} hPa</strong>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="loading">
    <div class="spinner">Loading...</div>
  </div>

  <div v-else-if="error" class="error-container card">
    <p class="error-message">{{ error }}</p>
  </div>
</template>
    
    <script setup>
const props = defineProps({
  weather: {
    type: Object,
    default: () => null,
  },
  city: {
    type: Object,
    default: () => null,
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
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
    
    <style scoped>
.weather-viewer {
  width: 100%;
}

.weather-header {
  text-align: center;
  margin-bottom: 20px;
}

.weather-date {
  color: #666;
  font-size: 0.9rem;
}

.weather-main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 20px 0;
}

.weather-temp {
  font-size: 4rem;
  font-weight: bold;
}

.weather-icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.weather-description {
  text-transform: capitalize;
  font-size: 1.2rem;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--primary-color);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  padding: 20px;
  text-align: center;
}

.error-message {
  color: var(--danger-color);
  font-size: 1.2rem;
}

.city-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>