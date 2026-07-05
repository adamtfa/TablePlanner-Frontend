<template>
  <main>
    <div class="auth-card">
      <div class="brand">
        <span class="brand-icon"><i class="mdi mdi-silverware-fork-knife"></i></span>
        <span class="brand-name">TablePlanner</span>
      </div>

      <h1>Hello there!</h1>
      <p class="subtitle">Create your account.</p>

      <div v-if="registerError" class="error-banner">{{ registerError }}</div>
      <div v-if="registerSuccess" class="success-banner">
        Registration successful! Redirecting to login&hellip;
      </div>

      <div class="form-fields">
        <div class="field-wrapper">
          <label for="register-name">Restaurant</label>
          <input
            id="register-name"
            v-model="nameField"
            type="text"
            placeholder="Your Restaurant"
            :class="{ 'input-error': errors.name }"
            @input="errors.name = ''"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>
        <div class="field-wrapper">
          <label for="register-email">Email</label>
          <input
            id="register-email"
            v-model="emailField"
            type="text"
            placeholder="Your Email"
            :class="{ 'input-error': errors.email }"
            @input="errors.email = ''"
          />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>
        <div class="field-wrapper">
          <label for="register-password">Password</label>
          <input
            id="register-password"
            v-model="passwordField"
            type="password"
            placeholder="Choose your Password"
            :class="{ 'input-error': errors.password }"
            @input="errors.password = ''"
          />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>
        <div class="field-wrapper">
          <label for="register-confirm-password">Confirm password</label>
          <input
            id="register-confirm-password"
            v-model="confirmPasswordField"
            type="password"
            placeholder="Repeat your Password"
            :class="{ 'input-error': errors.confirmPassword }"
            @input="errors.confirmPassword = ''"
          />
          <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
        </div>
      </div>

      <button class="btn-primary" @click="submit">Register</button>

      <p class="switch-link">
        Already have an account? <RouterLink to="/login">Log in here.</RouterLink>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/auth'

const router = useRouter()

const nameField = ref<string>('')
const emailField = ref<string>('')
const passwordField = ref<string>('')
const confirmPasswordField = ref<string>('')
const registerError = ref<string>('')
const registerSuccess = ref<boolean>(false)
const errors = ref<{ name: string; email: string; password: string; confirmPassword: string }>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

let errorTimeout: ReturnType<typeof setTimeout> | undefined
let validationErrorTimeout: ReturnType<typeof setTimeout> | undefined

onUnmounted(() => {
  if (errorTimeout) {
    clearTimeout(errorTimeout)
  }
  if (validationErrorTimeout) {
    clearTimeout(validationErrorTimeout)
  }
})

function validateForm(): boolean {
  errors.value.name = ''
  errors.value.email = ''
  errors.value.password = ''
  errors.value.confirmPassword = ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (nameField.value === '') {
    errors.value.name = 'Restaurant is required.'
  }

  if (emailField.value === '') {
    errors.value.email = 'Email is required.'
  } else if (!emailRegex.test(emailField.value)) {
    errors.value.email = 'Please enter a valid email address.'
  }

  if (passwordField.value === '') {
    errors.value.password = 'Password is required.'
  } else if (passwordField.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long.'
  }

  if (confirmPasswordField.value === '') {
    errors.value.confirmPassword = 'Please confirm your password.'
  } else if (confirmPasswordField.value !== passwordField.value) {
    errors.value.confirmPassword = 'Passwords do not match.'
  }

  const isValid =
    errors.value.name === '' &&
    errors.value.email === '' &&
    errors.value.password === '' &&
    errors.value.confirmPassword === ''

  if (!isValid) {
    if (validationErrorTimeout) {
      clearTimeout(validationErrorTimeout)
    }
    validationErrorTimeout = setTimeout(() => {
      errors.value.name = ''
      errors.value.email = ''
      errors.value.password = ''
      errors.value.confirmPassword = ''
    }, 3000)
  }

  return isValid
}

function submit() {
  registerError.value = ''
  registerSuccess.value = false

  if (!validateForm()) {
    return
  }

  register(nameField.value, emailField.value, passwordField.value)
    .then(() => {
      registerSuccess.value = true
      setTimeout(() => {
        router.push({ path: '/login', query: { identifier: nameField.value } })
      }, 1200)
    })
    .catch((error) => {
      registerError.value = error.message
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }
      errorTimeout = setTimeout(() => {
        registerError.value = ''
      }, 3000)
    })
}
</script>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
}

.auth-card {
  background-color: var(--background-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 350px;
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-main);
  color: var(--background-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-main);
  letter-spacing: 1px;
}

.auth-card h1 {
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--text-main);
  margin: 0 0 0.4rem 0;
}

.subtitle {
  color: var(--accent-main);
  margin: 0 0 1.75rem 0;
  font-size: 0.95rem;
}

.error-banner {
  background-color: rgba(224, 85, 85, 0.15);
  color: #e05555;
  border: 1px solid rgba(224, 85, 85, 0.4);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  width: 90%;
  box-sizing: border-box;
}

.success-banner {
  background-color: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.4);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  width: 90%;
  box-sizing: border-box;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 90%;
  align-items: center;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
}

.field-wrapper label {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-fields input {
  background-color: var(--background-main);
  color: var(--text-main);
  border: 1px solid rgba(201, 164, 76, 0.3);
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
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

.input-error {
  border-color: #e05555 !important;
}

.error-text {
  color: #e05555;
  font-size: 0.8rem;
  text-align: center;
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
  width: 45%;
  margin-top: 1.25rem;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
}

.switch-link {
  margin-top: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.switch-link a {
  color: var(--accent-main);
  text-decoration: none;
  font-weight: 600;
}

.switch-link a:hover {
  color: var(--accent-hover);
}
</style>
