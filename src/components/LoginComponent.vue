<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleEmailSignIn">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign in with Email</button>
    </form>
    <div class="divider">or</div>
    <button @click="handleGoogleSignIn">Sign in with Google</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="user" class="success">Welcome, {{ user.displayName || user.email }}</p>
    <p class="switch-link">
      Don't have an account?
      <router-link to="/signup">Sign up here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithGoogle, signInWithEmail } from '../config/firebase'
import { useRouter } from 'vue-router'

const user = ref(null)
const error = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleEmailSignIn = async () => {
  error.value = ''
  try {
    user.value = await signInWithEmail(email.value, password.value)
    router.push('/home') // Redirect to home after successful login
  } catch (err) {
    error.value = 'Email sign-in failed.'
  }
}

const handleGoogleSignIn = async () => {
  error.value = ''
  try {
    user.value = await signInWithGoogle()
    router.push('/home') // Redirect to home after successful Google sign-in
  } catch (err) {
    error.value = 'Google sign-in failed.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

input {
  padding: 8px;
  font-size: 15px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.divider {
  margin: 12px 0;
  color: #888;
}

.error {
  color: red;
  margin-top: 12px;
}

.success {
  color: green;
  margin-top: 12px;
}

.switch-link {
  margin-top: 16px;
  font-size: 14px;
}
</style>