<script setup lang="ts"></script>

<template>
  <main>
    <div class="hero">
      <h1>
        <span class="brand-icon"><i class="mdi mdi-silverware-fork-knife"></i></span>
        TablePlanner
      </h1>
      <h2>Description</h2>
      <p>
        <span>TablePlanner</span> is a modern management system designed to streamline
        the day-to-day operations of your restaurant. It provides a centralized platform for
        managing tables, guests, and reservations by giving your staff the tools they need to
        deliver a seamless dining experience. With full control over your tables, their
        capacity and real-time availability, your team always has a clear overview at any given
        moment. A built-in customer database lets you maintain guest profiles for personalized and
        attentive service. The reservation system ties everything together, allowing staff to
        create, modify, and cancel reservations with ease — all through a clean and intuitive interface.
      </p>
      <h2>Project repositories</h2>
      <p>
        <a href="https://github.com/adamtfa/TablePlanner-Frontend" target="_blank">
          https://github.com/adamtfa/TablePlanner-Frontend</a
        >
      </p>
      <p>
        <a href="https://github.com/adamtfa/TablePlanner-Backend" target="_blank">
          https://github.com/adamtfa/TablePlanner-Backend</a
        >
      </p>
      <h2>Developer Team</h2>
      <p>Nando Patton</p>
      <p>Adam Tuffaha</p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  text-align: center;
  margin: 0 4.5rem;
}

.hero h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: 300;
  color: var(--accent-main);
}

.brand-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--accent-main);
  color: var(--background-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.hero h2 {
  font-size: 2rem;
  font-weight: 300;
}

.hero p {
  font-size: 1rem;
}

.hero p span {
  color: var(--accent-main);
}

.hero a {
  color: var(--accent-main);
}

@media (max-width: 768px) {
  main {
    margin: 0 1.5rem;
  }

  .hero h1 {
    flex-direction: column;
    font-size: 2rem;
  }
}
</style>
