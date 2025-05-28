// Fetch a list of Star Wars characters, optionally filtered by name
export async function fetchCharacters(searchTerm = '') {
  const url = searchTerm
    ? `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}`
    : 'https://swapi.py4e.com/api/people/'

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch characters')

    const data = await res.json()
    let results = data.results || data.result || []
    if (!Array.isArray(results)) results = [results]
    return results
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to fetch characters. Please try again later.')
  }
}




