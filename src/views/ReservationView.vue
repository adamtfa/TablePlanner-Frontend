<template>
  <main>
    <div class="section-header">
      <h1>Reservation overview</h1>
      <button class="btn-primary" @click="showForm = !showForm">
        <i class="mdi mdi-plus"></i> Add reservation
      </button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click="closeForm()">
      <div class="form-card" @click.stop>
        <h2>{{ editingId === null ? 'Add reservation' : 'Edit reservation' }}</h2>
        <div class="form-fields">
          <div class="field-wrapper">
            <input
              v-model="dateField"
              type="date"
              placeholder="Date"
              :class="{ 'input-error': errors.date }"
            />
            <span v-if="errors.date" class="error-text">{{ errors.date }}</span>
          </div>
          <div class="field-wrapper">
            <input
              v-model="timeField"
              type="time"
              placeholder="Time"
              :class="{ 'input-error': errors.time }"
            />
            <span v-if="errors.time" class="error-text">{{ errors.time }}</span>
          </div>
          <div class="field-wrapper">
            <input
              v-model="numberOfGuestsField"
              type="text"
              placeholder="Number of guests"
              :class="{ 'input-error': errors.numberOfGuests }"
            />
            <span v-if="errors.numberOfGuests" class="error-text">{{ errors.numberOfGuests }}</span>
          </div>
          <div class="field-wrapper">
            <select v-model="customerIdField" :class="{ 'input-error': errors.customerId }">
              <option :value="null" disabled>Select customer</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                {{ customer.firstName }} {{ customer.lastName }}
              </option>
            </select>
            <span v-if="errors.customerId" class="error-text">{{ errors.customerId }}</span>
          </div>
          <div class="field-wrapper">
            <select v-model="tableIdField" :class="{ 'input-error': errors.tableId }">
              <option :value="null" disabled>Select table</option>
              <option v-for="table in tables" :key="table.id" :value="table.id">
                Table {{ table.tableNumber }}
              </option>
            </select>
            <span v-if="errors.tableId" class="error-text">{{ errors.tableId }}</span>
          </div>
        </div>
        <button class="btn-primary" @click="saveReservation()">
          {{ editingId === null ? 'Save' : 'Update' }}
        </button>
      </div>
    </div>

    <div v-if="reservations.length === 0" class="empty-state">
      <i class="mdi mdi-calendar-clock-outline"></i>
      <p>No upcoming reservations.</p>
    </div>
    <div v-else class="cards-grid">
      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
        <div class="card-info">
          <i class="mdi mdi-calendar-clock-outline"></i>
          <h2>{{ reservation.customer.firstName }} {{ reservation.customer.lastName }}</h2>
          <p>Date: {{ reservation.date }} Time: {{ reservation.time }}</p>
          <p>
            Guests: {{ reservation.numberOfGuests }} - Table: {{ reservation.table.tableNumber }}
          </p>
        </div>
        <div class="card-actions">
          <button class="btn-edit" @click="editReservation(reservation)">Edit</button>
          <button class="btn-delete" @click="deleteReservation(reservation.id)">Delete</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Customer = {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
}

type RestaurantTable = {
  id: number
  tableNumber: number
  capacity: number
  available: boolean
}

type Reservation = {
  id: number
  date: string
  time: string
  numberOfGuests: number
  customer: Customer
  table: RestaurantTable
}

onMounted(() => {
  loadReservations()
  loadCustomers()
  loadTables()
})

const showForm = ref<boolean>(false)
const editingId = ref<number | null>(null)
const dateField = ref<string>('')
const timeField = ref<string>('')
const numberOfGuestsField = ref<number | string | null>(null)
const customerIdField = ref<number | null>(null)
const tableIdField = ref<number | null>(null)
const customers = ref<Customer[]>([])
const tables = ref<RestaurantTable[]>([])
const reservations = ref<Reservation[]>([])
const errors = ref<{
  date: string
  time: string
  numberOfGuests: string
  customerId: string
  tableId: string
}>({
  date: '',
  time: '',
  numberOfGuests: '',
  customerId: '',
  tableId: '',
})

function loadCustomers() {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/customers'
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      customers.value = result
    })
    .catch((error) => console.log('error', error))
}

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

function loadReservations() {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/reservations'
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      reservations.value = result
    })
    .catch((error) => console.log('error', error))
}

function saveReservation() {
  if (!validateForm()) {
    return
  }

  const data = {
    date: dateField.value,
    time: timeField.value,
    numberOfGuests: numberOfGuestsField.value,
  }

  let endpoint =
    import.meta.env.VITE_APP_BACKEND_BASE_URL +
    `/reservations?customerId=${customerIdField.value}&tableId=${tableIdField.value}`
  let method = 'POST'

  if (editingId.value !== null) {
    endpoint =
      import.meta.env.VITE_APP_BACKEND_BASE_URL +
      `/reservations/${editingId.value}?customerId=${customerIdField.value}&tableId=${tableIdField.value}`
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
      loadReservations()
      closeForm()
    })
    .catch((error) => console.log('error', error))
}

function editReservation(reservation: Reservation) {
  editingId.value = reservation.id
  dateField.value = reservation.date
  timeField.value = reservation.time
  numberOfGuestsField.value = reservation.numberOfGuests
  customerIdField.value = reservation.customer.id
  tableIdField.value = reservation.table.id
  showForm.value = true
}

function deleteReservation(id: number) {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + `/reservations/${id}`
  const requestOptions = {
    method: 'DELETE',
  }
  fetch(endpoint, requestOptions)
    .then(() => {
      loadReservations()
    })
    .catch((error) => console.log('error', error))
}

function closeForm() {
  showForm.value = false
  dateField.value = ''
  timeField.value = ''
  numberOfGuestsField.value = null
  customerIdField.value = null
  tableIdField.value = null
  editingId.value = null
}

function validateForm(): boolean {
  errors.value.date = ''
  errors.value.time = ''
  errors.value.numberOfGuests = ''
  errors.value.customerId = ''
  errors.value.tableId = ''

  if (dateField.value === '') {
    errors.value.date = 'Date is required.'
  } else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(dateField.value)
    if (selectedDate < today) {
      errors.value.date = 'Date cannot be in the past.'
    }
  }

  if (timeField.value === '') {
    errors.value.time = 'Time is required.'
  }

  if (numberOfGuestsField.value === null || numberOfGuestsField.value === '') {
    errors.value.numberOfGuests = 'Number of guests is required.'
  } else if (Number(numberOfGuestsField.value) <= 0) {
    errors.value.numberOfGuests = 'Number of guests must be greater than 0.'
  }

  if (customerIdField.value === null) {
    errors.value.customerId = 'Please select a customer.'
  }

  if (tableIdField.value === null) {
    errors.value.tableId = 'Please select a table.'
  }

  return (
    errors.value.date === '' &&
    errors.value.time === '' &&
    errors.value.numberOfGuests === '' &&
    errors.value.customerId === '' &&
    errors.value.tableId === ''
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

.reservation-card {
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

.reservation-card:hover {
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

.form-fields input[type='text'],
.form-fields input[type='date'],
.form-fields input[type='time'],
.form-fields select {
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

.form-fields input:focus,
.form-fields select:focus {
  border-color: var(--accent-main);
}

.form-fields input[type='date']::-webkit-calendar-picker-indicator,
.form-fields input[type='time']::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 0;
  margin: 0;
  cursor: pointer;
}

.form-fields select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.form-card .btn-primary {
  width: auto;
  padding: 0.75rem 2rem;
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
