import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '@/views/TableView.vue'
import CustomerView from '@/views/CustomerView.vue'
import ReservationView from '@/views/ReservationView.vue'

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
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
