<template>
  <div class="saved-cities card" v-if="cities.length > 0">
    <h2>Saved Cities</h2>
    <div class="city-list">
      <div
        v-for="city in cities"
        :key="city.id"
        class="city-card"
        @click="selectCity(city)"
      >
        <div class="city-info">
          <strong>{{ city.name }}</strong>
          <span v-if="city.country">{{ city.country }}</span>
        </div>
        <button
          class="btn-remove"
          @click.stop="removeCity(city.id)"
          title="Remove from saved cities"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useCitiesStore } from "~/stores/cities";

const store = useCitiesStore();
const router = useRouter();

const props = defineProps({
  cities: {
    type: Array,
    default: () => [],
  },
});

const selectCity = (city) => {
  router.push(`/city/${city.name}`);
};

const removeCity = (cityId) => {
  store.removeCity(cityId);
};
</script>
  
  <style scoped>
.saved-cities h2 {
  margin-bottom: 15px;
  color: var(--dark-color);
}

.city-card {
  background: white;
  border-radius: 8px;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.city-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.btn-remove {
  background: none;
  border: none;
  color: var(--danger-color);
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

.city-info {
  display: flex;
  flex-direction: column;
}
</style>