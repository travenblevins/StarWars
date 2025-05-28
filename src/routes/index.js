import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import HomePageComponent from '../components/HomePage.vue' // <-- Fix this line
import SignupComponent from '../components/SignupComponent.vue' // Importing SignupComponent

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect root path to login
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/home',
    name: 'home',
    component: HomePageComponent // <-- This now matches the correct file
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignupComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router