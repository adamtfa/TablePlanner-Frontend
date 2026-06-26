<script setup lang="ts"></script>

<template>
  <header>
    <nav class="nav-container">
      <div class="logo">TablePlanner</div>
      <ul class="nav-links">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
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
  border-bottom: 1px solid rgba(201, 164, 76, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-main);
  letter-spacing: 1px;
  cursor: pointer;
}

.nav-links {
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
  color: var(--accent-main);
  opacity: 0.75;
}

.nav-links a.router-link-active {
  color: var(--accent-main);
}
</style>
