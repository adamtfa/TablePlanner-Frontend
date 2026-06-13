<template>
  <h1>{{ title }}</h1>
  <div>
    <ul>
      <li v-for="table in tables" :key="table.tableNumber">
        Number: {{ table.tableNumber }} - Capacity: {{ table.capacity }} - Availability:
        {{ table.available }}
      </li>
    </ul>
  </div>
  <div>
    <input v-model="tableNumberField" type="number" placeholder="Table Number" />
    <input v-model="capacityField" type="number" placeholder="Capacity" />
    <input v-model="isAvailableField" type="checkbox" />
    <button @click="save">Add Table</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type RestaurantTable = {
  tableNumber: number
  capacity: number
  available: boolean
}

defineProps<{
  title: string
}>()

const tables = ref<RestaurantTable[]>([])

function loadTables() {
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
}

onMounted(() => loadTables())

const tableNumberField = ref<number>(0)
const capacityField = ref<number>(0)
const isAvailableField = ref<boolean>(false)

function save() {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/tables'
  const data = {
    tableNumber: tableNumberField.value,
    capacity: capacityField.value,
    isAvailable: isAvailableField.value,
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      loadTables()
    })
    .catch((error) => console.log('error', error))
}
</script>

<style scoped>
li {
  margin: 10px 0;
}
</style>
