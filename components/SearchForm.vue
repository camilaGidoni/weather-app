<template>
    <div class="search-container card">
      <form @submit.prevent="searchWeather" class="search-form">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Enter city name (e.g., London, UK)" 
          class="form-control"
          required
        />
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-search"></i> Search
        </button>
        <button type="button" @click="getCurrentLocation" class="btn btn-secondary">
          <i class="fas fa-location-arrow"></i> Current Location
        </button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchQuery = ref('');
  const error = ref('');
  const emit = defineEmits(['search', 'current-location']);
  
  const searchWeather = () => {
    if (searchQuery.value.trim() === '') {
      error.value = 'Please enter a city name';
      return;
    }
    
    error.value = '';
    emit('search', searchQuery.value);
  };
  
  const getCurrentLocation = () => {
    error.value = '';
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          emit('current-location', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          error.value = `Geolocation error: ${err.message}`;
        }
      );
    } else {
      error.value = 'Geolocation is not supported by your browser';
    }
  };
  </script>
  
  <style scoped>
  .search-container {
    width: 100%;
  }
  
  .error-message {
    color: var(--danger-color);
    margin-top: 10px;
  }
  </style>