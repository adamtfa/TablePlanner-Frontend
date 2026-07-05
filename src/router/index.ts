import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '@/views/TableView.vue'
import CustomerView from '@/views/CustomerView.vue'
import ReservationView from '@/views/ReservationView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { isAuthenticated } from '@/services/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/tables',
    name: 'Tables',
    component: TableView,
  },
  {
    path: '/customers',
    name: 'Customers',
    component: CustomerView,
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: ReservationView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { public: true, hideChrome: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { public: true, hideChrome: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  if (!to.meta.public && !isAuthenticated()) {
    return { name: 'Login' }
  }
})

export default router
