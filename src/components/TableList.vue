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
type RestaurantTable = {
  tableNumber: number
  capacity: number
  isAvailable: boolean
}

defineProps<{
  title: string
}>()

const tables: RestaurantTable[] = [
  { tableNumber: 1, capacity: 2, isAvailable: true },
  { tableNumber: 2, capacity: 4, isAvailable: false },
  { tableNumber: 3, capacity: 6, isAvailable: true },
]
</script>

<style scoped>

li {
margin: 10px 0;
}

</style>
