<template>
  <h1>{{ title }}</h1>
  <div>
    <ul>
      <li v-for="table in tables" :key="table.tableNumber">
        Number: {{ table.tableNumber }} - Capacity: {{ table.capacity }} - Availability:
        {{ table.isAvailable }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type RestaurantTable = {
  tableNumber: number
  capacity: number
  isAvailable: boolean
}

defineProps<{
  title: string
}>()

const tables = ref<RestaurantTable[]>([])

onMounted(() => {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/tables'
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      tables.value = result
    })
    .catch((error) => console.log('error', error))
})
</script>

<style scoped>
li {
  margin: 10px 0;
}
</style>
