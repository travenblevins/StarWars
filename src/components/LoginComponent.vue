<template>
  <div class="login-container">
    <h2>Login</h2>
    <button @click="handleGoogleSignIn">Sign in with Google</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="user" class="success">Welcome, {{ user.displayName }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithGoogle } from '../config/firebase'

const user = ref(null)
const error = ref('')

const handleGoogleSignIn = async () => {
  error.value = ''
  try {
    user.value = await signInWithGoogle()
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
button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 12px;
}
.success {
  color: green;
  margin-top: 12px;
}
</style>