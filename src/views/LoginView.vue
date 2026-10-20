<template>
  <main>
    <div class="auth-card">
      <div class="brand">
        <span class="brand-icon"><i class="mdi mdi-silverware-fork-knife"></i></span>
        <span class="brand-name">TablePlanner</span>
      </div>

      <h1>Welcome back!</h1>
      <p class="subtitle">Sign in to your account.</p>

      <div v-if="loginError" class="error-banner">{{ loginError }}</div>

      <div class="form-fields">
        <div class="field-wrapper">
          <label for="login-identifier">Restaurant or Email</label>
          <input
            id="login-identifier"
            v-model="identifierField"
            type="text"
            placeholder="Your Restaurant or Email"
            :class="{ 'input-error': errors.identifier }"
            @input="errors.identifier = ''"
            @keyup.enter="submit"
          />
          <span v-if="errors.identifier" class="error-text">{{ errors.identifier }}</span>
        </div>
        <div class="field-wrapper">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="passwordField"
            type="password"
            placeholder="Your Password"
            :class="{ 'input-error': errors.password }"
            @input="errors.password = ''"
            @keyup.enter="submit"
          />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>
      </div>

      <button class="btn-primary" @click="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-icon"><i class="mdi mdi-timer-sand"></i></span>
        <span>{{ isSubmitting ? 'Signing in…' : 'Sign in' }}</span>
      </button>

      <p class="switch-link">
        Not registered yet? <RouterLink to="/register">Register here.</RouterLink>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '@/services/auth'

const route = useRoute()
const router = useRouter()

const identifierField = ref<string>('')
const passwordField = ref<string>('')
const loginError = ref<string>('')
const errors = ref<{ identifier: string; password: string }>({
  identifier: '',
  password: '',
})
const isSubmitting = ref<boolean>(false)

let errorTimeout: ReturnType<typeof setTimeout> | undefined
let validationErrorTimeout: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const prefill = route.query.identifier
  if (typeof prefill === 'string') {
    identifierField.value = prefill
  }
})

onUnmounted(() => {
  if (errorTimeout) {
    clearTimeout(errorTimeout)
  }
  if (validationErrorTimeout) {
    clearTimeout(validationErrorTimeout)
  }
})

function validateForm(): boolean {
  errors.value.identifier = ''
  errors.value.password = ''

  if (identifierField.value === '') {
    errors.value.identifier = 'Restaurant or Email is required.'
  }
  if (passwordField.value === '') {
    errors.value.password = 'Password is required.'
  }

  const isValid = errors.value.identifier === '' && errors.value.password === ''

  if (!isValid) {
    if (validationErrorTimeout) {
      clearTimeout(validationErrorTimeout)
    }
    validationErrorTimeout = setTimeout(() => {
      errors.value.identifier = ''
      errors.value.password = ''
    }, 3000)
  }

  return isValid
}

function submit() {
  loginError.value = ''
  if (!validateForm()) {
    return
  }
  isSubmitting.value = true

  login(identifierField.value, passwordField.value)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      loginError.value = error.message
      identifierField.value = ''
      passwordField.value = ''
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }
      errorTimeout = setTimeout(() => {
        loginError.value = ''
      }, 3000)
    })
    .finally(() => {
      isSubmitting.value = false
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner-icon {
  display: inline-flex;
  font-size: 1.1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-primary:hover:not(:disabled) {
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
