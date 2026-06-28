<script setup lang="ts"></script>

<template>
  <footer>
    <RouterLink to="/about">About Us</RouterLink>
  </footer>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
footer {
  background-color: var(--background-card);
  border: 1px solid rgba(201, 164, 76, 0.1);
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 0 0 1.5rem 0;
  position: fixed;
  bottom: 0;
  text-align: center;
  left: 1.5rem;
  right: 1.5rem;
}

footer a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

footer a:hover {
  color: var(--accent-hover);
  opacity: 0.75;
}

footer a.router-link-active {
  color: var(--accent-main);
}
</style>
