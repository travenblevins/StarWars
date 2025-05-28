<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="handleSignup">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Create Account</button>
        </form>
        <div class="divider">or</div>
        <button @click="handleGoogleSignIn">Sign in with Google</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="user" class="success">Welcome, {{ user.displayName || user.email }}</p>
        <p class="switch-link">
            Already have an account?
            <router-link to="/login">Login here</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithGoogle } from '../config/firebase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const user = ref(null)
const error = ref('')
const auth = getAuth()
const router = useRouter()

const handleSignup = async () => {
    error.value = ''
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        user.value = userCredential.user
        router.push('/home') // Redirect to home after successful signup
    } catch (err) {
        error.value = err.message || 'Signup failed.'
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
.signup-container {
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

.error {
    color: red;
    margin-top: 12px;
}

.success {
    color: green;
    margin-top: 12px;
}
</style>