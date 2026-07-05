const TOKEN_KEY = 'tableplanner_token'
const RESTAURANT_NAME_KEY = 'tableplanner_restaurant_name'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRestaurantName(): string | null {
  return localStorage.getItem(RESTAURANT_NAME_KEY)
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}

export async function login(identifier: string, password: string): Promise<void> {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/auth/login'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  }

  const response = await fetch(endpoint, requestOptions)
  if (!response.ok) {
    throw new Error('Invalid Restaurant/Email or Password.')
  }
  const data = await response.json()
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(RESTAURANT_NAME_KEY, data.restaurantName)
}

export async function register(name: string, email: string, password: string): Promise<void> {
  const endpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/auth/register'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }

  const response = await fetch(endpoint, requestOptions)
  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('This Restaurant/Email is already registered.')
    }
    throw new Error('Registration failed. Please try again.')
  }
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(RESTAURANT_NAME_KEY)
}

export function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken()
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return fetch(url, { ...options, headers })
}
