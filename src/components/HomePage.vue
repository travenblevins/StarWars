<template>
  <div class="home-container">
    <h1>Welcome to Star Wars Explorer</h1>
    <p>Search for any Star Wars character you'd like</p>
    <h2>Star Wars Characters</h2>
    <form @submit.prevent="handleSearch" class="search-form">
      <input v-model="searchTerm" type="text" placeholder="Search for a character..." />
      <button type="submit">Search</button>
    </form>
    <div v-if="loading">Loading characters...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="characters">
      <div v-for="character in people" :key="character.url" class="character-card">
        <img :src="getCharacterImage(character.name)" :alt="character.name" class="character-img" @error="onImgError" />
        <div class="character-details">
          <h3>{{ character.name }}</h3>
          <ul>
            <li><strong>Height:</strong> {{ character.height }}</li>
            <li><strong>Mass:</strong> {{ character.mass }}</li>
            <li><strong>Gender:</strong> {{ character.gender }}</li>
            <li><strong>Birth Year:</strong> {{ character.birth_year }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCharacters } from '../services/StarWars'

// Import character images
import lukeSkywalker from '../assets/luke-skywalker-main_7ffe21c7.jpeg'
import darthVader from '../assets/Darth-Vader-Star-Wars-Empire-Strikes-Back-1.avif'
import benKenobi from '../assets/Ben_Kenobi.png'
import leia from '../assets/leia.jpg'
import owenLars from '../assets/owen-lars-main_08c717c8.jpeg'
import beruWhitesun from '../assets/BeruWhitesun22BBY-SWCT-Photoroom.webp'
import r5d4 from '../assets/r5-d4_main_image_7d5f078e.jpeg'
import biggs from '../assets/Biggsdarklighter-ANH.webp'
import hanSolo from '../assets/Han-Solo.avif'
import r2d2 from '../assets/r2d2.jpeg'
import c3po from '../assets/c3po.jpeg'

const characterImages = {
  'Luke Skywalker': lukeSkywalker,
  'Darth Vader': darthVader,
  'Obi-Wan Kenobi': benKenobi,
  'Leia Organa': leia,
  'Owen Lars': owenLars,
  'Beru Whitesun lars': beruWhitesun,
  'R5-D4': r5d4,
  'Biggs Darklighter': biggs,
  'C-3PO': c3po, // Will use fallback avatar
  'R2-D2': r2d2,
  'Han Solo': hanSolo,
  
}

const people = ref([])
const loading = ref(false)
const error = ref('')
const searchTerm = ref('')

function getCharacterImage(name) {
  return characterImages[name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=000&color=FFE81F&size=300`
}

function onImgError(event) {
  const characterName = event.target.alt
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(characterName)}&background=000&color=FFE81F&size=300`
}

const loadCharacters = async (term = '') => {
  loading.value = true
  error.value = ''
  try {
    const chars = await fetchCharacters(term)
    people.value = chars
  } catch (err) {
    console.error('Error loading characters:', err)
    error.value = 'Failed to load Star Wars characters.'
    people.value = []
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  loadCharacters(searchTerm.value)
}

onMounted(() => {
  loadCharacters()
})
</script>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  background: #fafafa;
}

h1 {
  margin-bottom: 16px;
  color: #333;
}

h2 {
  margin-top: 32px;
  color: #222;
}

.search-form {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.search-form input {
  padding: 8px;
  font-size: 15px;
  width: 220px;
}

.search-form button {
  padding: 8px 16px;
  font-size: 15px;
  cursor: pointer;
}

.characters {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 24px;
}

.character-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 180px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
  background: #eee;
}

.character-details {
  text-align: left;
  width: 100%;
}

.character-details h3 {
  margin: 0 0 8px 0;
  font-size: 1.1em;
}

.character-details ul {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.95em;
}

.character-details li {
  margin-bottom: 4px;
}

.error {
  color: red;
  margin-top: 12px;
}
</style>