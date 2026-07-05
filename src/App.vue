<script setup lang="ts">
import { computed } from 'vue'
import router from '@/router'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

const hideChrome = computed(() => router.currentRoute.value.meta.hideChrome === true)
</script>

<template>
  <NavBar v-if="!hideChrome" />
  <RouterView />
  <FooterBar v-if="!hideChrome" />
</template>

<style scoped></style>
