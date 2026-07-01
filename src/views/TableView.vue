<template>
  <main>
    <div class="section-header">
      <h1>Table management</h1>
      <button class="btn-primary" @click="showForm = !showForm">
        <i class="mdi mdi-plus"></i> Add table
      </button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click="closeForm">
      <div class="form-card" @click.stop>
        <h2>{{ editingId === null ? 'Add table' : 'Edit table' }}</h2>
        <div class="form-fields">
          <div class="field-wrapper">
            <input
              v-model="tableNumberField"
              type="text"
              placeholder="Table number"
              :class="{ 'input-error': errors.tableNumber }"
            />
            <span v-if="errors.tableNumber" class="error-text">{{ errors.tableNumber }}</span>
          </div>
          <div class="field-wrapper">
            <input
              v-model="capacityField"
              type="text"
              placeholder="Capacity"
              :class="{ 'input-error': errors.capacity }"
            />
            <span v-if="errors.capacity" class="error-text">{{ errors.capacity }}</span>
          </div>
          <label class="checkbox-label">
            Is the table available?
            <input v-model="isAvailableField" type="checkbox" />
          </label>
        </div>
        <button class="btn-primary" @click="saveTable()">
          {{ editingId === null ? 'Save' : 'Update' }}
        </button>
      </div>
    </div>

    <div v-if="tables.length === 0" class="empty-state">
      <i class="mdi mdi-table-furniture"></i>
      <p>Add new tables to start managing them.</p>
    </div>
    <div v-else class="cards-grid">
      <div v-for="table in tables" :key="table.id" class="table-card">
        <div class="card-info">
          <i class="mdi mdi-table-furniture"></i>
          <h2>Table number {{ table.tableNumber }}</h2>
          <p>Capacity: {{ table.capacity }}</p>
          <p>{{ table.available ? 'Available' : 'Not available' }}</p>
        </div>
        <div class="card-actions">
          <button class="btn-edit" @click="editTable(table)">Edit</button>
          <button class="btn-delete" @click="deleteTable(table.id)">Delete</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type RestaurantTable = {
  id: number
  tableNumber: number
  capacity: number
  available: boolean
}

onMounted(() => loadTables())

const showForm = ref<boolean>(false)
const editingId = ref<number | null>(null)
const tableNumberField = ref<number | string | null>(null)
const capacityField = ref<number | string | null>(null)
const isAvailableField = ref<boolean>(false)
const tables = ref<RestaurantTable[]>([])
const errors = ref<{ tableNumber: string; capacity: string }>({
  tableNumber: '',
  capacity: '',
})

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

function saveTable() {
  if (!validateForm()) {
    return
  }

  const data = {
    tableNumber: tableNumberField.value,
    capacity: capacityField.value,
    isAvailable: isAvailableField.value,
  }

  let endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/tables'
  let method = 'POST'

  if (editingId.value !== null) {
    endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + `/tables/${editingId.value}`
    method = 'PUT'
  }

  const requestOptions = {
    method: method,
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
      closeForm()
    })
    .catch((error) => console.log('error', error))
}

function editTable(table: RestaurantTable) {
  editingId.value = table.id
  tableNumberField.value = table.tableNumber
  capacityField.value = table.capacity
  isAvailableField.value = table.available
  showForm.value = true
}

function deleteTable(id: number) {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + `/tables/${id}`
  const requestOptions = {
    method: 'DELETE',
  }
  fetch(endpoint, requestOptions)
    .then(() => {
      loadTables()
    })
    .catch((error) => console.log('error', error))
}

function closeForm() {
  showForm.value = false
  tableNumberField.value = null
  capacityField.value = null
  isAvailableField.value = false
  editingId.value = null
}

function validateForm(): boolean {
  errors.value.tableNumber = ''
  errors.value.capacity = ''

  if (tableNumberField.value === null || tableNumberField.value === '') {
    errors.value.tableNumber = 'Table number is required.'
  } else if (Number(tableNumberField.value) <= 0) {
    errors.value.tableNumber = 'Table number must be positive.'
  }

  if (capacityField.value === null || capacityField.value === '') {
    errors.value.capacity = 'Capacity is required.'
  } else if (Number(capacityField.value) <= 0) {
    errors.value.capacity = 'Capacity must be greater than 0.'
  }
  return (
    errors.value.tableNumber === '' &&
    errors.value.capacity === ''
  )
}
</script>

<style scoped>
main {
  margin: 3rem 10.75rem;
}
.section-header {
  border-bottom: 1px solid rgba(201, 164, 76, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h1 {
  font-weight: 300;
  font-size: 2rem;
  color: var(--accent-main);
}

.section-header i {
  font-size: 1.25rem;
}

.btn-primary {
  background-color: var(--accent-main);
  color: var(--background-main);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background-color: var(--background-card);
  border-radius: 12px;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 3rem;
}

.empty-state p {
  margin-top: 0;
  font-size: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.table-card {
  background-color: var(--background-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: auto;
  transition: all 0.3s ease;
  text-align: center;
}

.table-card:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-info i {
  font-size: 2rem;
  margin-bottom: 0;
}

.card-info h2 {
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0;
  color: var(--text-main);
}

.card-info p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-edit {
  background-color: var(--accent-main);
  color: var(--background-main);
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.btn-edit:hover {
  background-color: var(--accent-hover);
}

.btn-delete {
  background-color: #e05555;
  color: var(--background-main);
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.btn-delete:hover {
  background-color: #c94444;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.form-card {
  background-color: var(--background-card);
  border: 1px solid rgba(201, 164, 76, 0.2);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.form-card h2 {
  font-weight: 300;
  font-size: 1.25rem;
  color: var(--accent-main);
  margin: 0;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
}

.form-fields input[type='text'] {
  background-color: var(--background-main);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.form-fields input:focus {
  border-color: var(--accent-main);
}

.form-card .btn-primary {
  width: auto;
  padding: 0.75rem 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
}

.input-error {
  border-color: #e05555 !important;
}

.error-text {
  color: #e05555;
  font-size: 0.8rem;
  text-align: left;
  padding-left: 0.2rem;
}
</style>
