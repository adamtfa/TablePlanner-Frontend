<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
body {
  font-family: Verdana, sans-serif;
  color: #76b900;
}

nav a {
  margin: 0 10px;
}

</style>
