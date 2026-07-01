<script setup lang="ts"></script>

<template>
  <main>
    <div class="hero">
      <h1>
        <i class="mdi mdi-silverware-fork-knife"></i> TablePlanner
        <i class="mdi mdi-silverware-fork-knife"></i>
      </h1>
      <h2>Description</h2>
      <p>
        <span>TablePlanner</span> is a modern restaurant management system designed to streamline
        the day-to-day operations of your establishment. It provides a centralized platform for
        managing tables, guests, and reservations by giving your staff the tools they need to
        deliver a seamless dining experience. With full control over your table inventory, including
        capacity and real-time availability, your team always has a clear overview at any given
        moment. A built-in customer directory lets you maintain guest profiles for personalized and
        attentive service. The reservation system ties everything together, allowing staff to
        create, modify, and cancel bookings with ease — all through a clean and intuitive interface.
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
  font-size: 3rem;
  font-weight: 300;
  color: var(--accent-main);
}

.hero h1 i {
  font-size: 3rem;
  color: var(--text-main);
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
</style>
