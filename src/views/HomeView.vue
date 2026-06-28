<script setup lang="ts"></script>

<template>
  <main>
    <div class="hero">
      <h1>Welcome to your <span>TablePlanner</span>.</h1>
      <p>
        The elegant management system for your restaurant. Keep track of your tables, guests, and
        reservations with ease.
      </p>
    </div>

    <div class="cards-grid">
      <RouterLink class="card" to="/tables">
        <i class="mdi mdi-table-furniture"></i>
        <h2>Tables</h2>
        <p>Manage your floor plan, table capacities, and real-time availability.</p>
      </RouterLink>

      <RouterLink class="card" to="/customers">
        <i class="mdi mdi-account-multiple-outline"></i>
        <h2>Customers</h2>
        <p>
          Maintain guests, dining history, and special preferences to deliver a flawless experience.
        </p>
      </RouterLink>

      <RouterLink class="card" to="/reservations">
        <i class="mdi mdi-calendar-clock-outline"></i>
        <h2>Reservations</h2>
        <p>Create, modify, and cancel reservations through a seamless workflow.</p>
      </RouterLink>

      <RouterLink class="card" to="/login">
        <i class="mdi mdi-door-open"></i>
        <h2>Exit</h2>
        <p>Log out of your TablePlanner and return to the login screen.</p>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 0 1.5rem;
}

.hero {
  margin: 4rem auto;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.hero h1 span {
  color: var(--accent-main);
}

.hero p {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  max-width: 1000px;
  margin: 4rem auto;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.card {
  background-color: var(--background-card);
  color: var(--text-main);
  border: 1px solid rgba(201, 164, 76, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-hover);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.card i {
  font-size: 1.75rem;
  line-height: 1.25;
}

.card h2 {
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 0;
}

.card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0 auto;
}
</style>
