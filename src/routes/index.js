import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import HomePageComponent from '../components/HomePage.vue' // <-- Fix this line

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePageComponent // <-- This now matches the correct file
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router