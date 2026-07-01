<template>
  <main>
    <div class="section-header">
      <h1>Customer database</h1>
      <button class="btn-primary" @click="showForm = !showForm">
        <i class="mdi mdi-plus"></i> Add customer
      </button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click="closeForm()">
      <div class="form-card" @click.stop>
        <h2>{{ editingId === null ? 'Add customer' : 'Edit customer' }}</h2>
        <div class="form-fields">
          <div class="field-wrapper">
            <input
              v-model="firstNameField"
              type="text"
              placeholder="First name"
              :class="{ 'input-error': errors.firstName }"
            />
            <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
          </div>
          <div class="field-wrapper">
            <input
              v-model="lastNameField"
              type="text"
              placeholder="Last name"
              :class="{ 'input-error': errors.lastName }"
            />
            <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
          </div>
          <div class="field-wrapper">
            <input
              v-model="phoneNumberField"
              type="text"
              placeholder="Phone number"
              :class="{ 'input-error': errors.phoneNumber }"
            />
            <span v-if="errors.phoneNumber" class="error-text">{{ errors.phoneNumber }}</span>
          </div>
        </div>
        <button class="btn-primary" @click="saveCustomer()">
          {{ editingId === null ? 'Save' : 'Update' }}
        </button>
      </div>
    </div>

    <div v-if="customers.length === 0" class="empty-state">
      <i class="mdi mdi-account-multiple-outline"></i>
      <p>Your database is still empty.</p>
    </div>
    <div v-else class="cards-grid">
      <div v-for="customer in customers" :key="customer.id" class="customer-card">
        <div class="card-info">
          <i class="mdi mdi-account-outline"></i>
          <h2>{{ customer.firstName }} {{ customer.lastName }}</h2>
          <p>Phone number: {{ customer.phoneNumber }}</p>
        </div>
        <div class="card-actions">
          <button class="btn-edit" @click="editCustomer(customer)">Edit</button>
          <button class="btn-delete" @click="deleteCustomer(customer.id)">Delete</button>
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

onMounted(() => loadCustomers())

const showForm = ref<boolean>(false)
const editingId = ref<number | null>(null)
const firstNameField = ref<string>('')
const lastNameField = ref<string>('')
const phoneNumberField = ref<string>('')
const customers = ref<Customer[]>([])
const errors = ref<{ firstName: string; lastName: string; phoneNumber: string }>({
  firstName: '',
  lastName: '',
  phoneNumber: '',
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

function saveCustomer() {
  if (!validateForm()) {
    return
  }

  const data = {
    firstName: firstNameField.value,
    lastName: lastNameField.value,
    phoneNumber: phoneNumberField.value,
  }

  let endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/customers'
  let method = 'POST'

  if (editingId.value !== null) {
    endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + `/customers/${editingId.value}`
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
      loadCustomers()
      closeForm()
    })
    .catch((error) => console.log('error', error))
}

function editCustomer(customer: Customer) {
  editingId.value = customer.id
  firstNameField.value = customer.firstName
  lastNameField.value = customer.lastName
  phoneNumberField.value = customer.phoneNumber
  showForm.value = true
}

function deleteCustomer(id: number) {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + `/customers/${id}`
  const requestOptions = {
    method: 'DELETE',
  }
  fetch(endpoint, requestOptions)
    .then(() => {
      loadCustomers()
    })
    .catch((error) => console.log('error', error))
}

function closeForm() {
  showForm.value = false
  firstNameField.value = ''
  lastNameField.value = ''
  phoneNumberField.value = ''
  editingId.value = null
}

function validateForm(): boolean {
  errors.value.firstName = ''
  errors.value.lastName = ''
  errors.value.phoneNumber = ''

  if (firstNameField.value === '') {
    errors.value.firstName = 'First name is required.'
  }

  if (lastNameField.value === '') {
    errors.value.lastName = 'Last name is required.'
  }

  if (phoneNumberField.value === '') {
    errors.value.phoneNumber = 'Phone number is required.'
  }
  return (
    errors.value.firstName === '' &&
    errors.value.lastName === '' &&
    errors.value.phoneNumber === ''
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

.customer-card {
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

.customer-card:hover {
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
