<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRestaurantName } from '@/services/auth'

const restaurantName = ref<string | null>(null)

onMounted(() => {
  restaurantName.value = getRestaurantName()
})
</script>

<template>
  <header>
    <nav class="nav-container">
      <RouterLink to="/" class="logo">
        <span class="brand-icon"><i class="mdi mdi-silverware-fork-knife"></i></span>
        <span>TablePlanner</span>
      </RouterLink>

      <div v-if="restaurantName" class="restaurant-badge">
        <i class="mdi mdi-account"></i>
        <span>{{ restaurantName }}</span>
      </div>

      <ul class="nav-links">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/tables">Tables</RouterLink></li>
        <li><RouterLink to="/customers">Customers</RouterLink></li>
        <li><RouterLink to="/reservations">Reservations</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
header {
  background-color: var(--background-card);
  border: 1px solid rgba(201, 164, 76, 0.1);
  border-radius: 12px;
  padding: 1rem 0;
  margin: 1.5rem;
  position: sticky;
}

.nav-container {
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo {
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-main);
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
}

.brand-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--accent-main);
  color: var(--background-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.restaurant-badge {
  justify-self: center;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.restaurant-badge i {
  font-size: 1.25rem;
  color: var(--accent-main);
}

.nav-links {
  justify-self: end;
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--accent-hover);
  opacity: 0.75;
}

.nav-links a.router-link-active {
  color: var(--accent-main);
}

@media (max-width: 768px) {
  .nav-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
