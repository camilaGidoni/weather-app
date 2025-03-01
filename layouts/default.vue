<template>
  <div>
    <header class="header">
      <div class="container">
        <h1>
          <NuxtLink to="/" class="logo">
            <i class="fas fa-cloud-sun"></i> Weather App
          </NuxtLink>
        </h1>
      </div>
    </header>

    <main class="container">
      <slot />
    </main>
  </div>
</template>
  
  <script setup>
import { onMounted } from "vue";
import { useCitiesStore } from "~/stores/cities";

const store = useCitiesStore();

onMounted(() => {
  store.initializeStore();
});
</script>
  
  <style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.logo {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>