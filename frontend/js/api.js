// api.js - Funciones para interactuar con la API REST del backend de Puertogames
// Define funciones asíncronas para obtener juegos, iniciar sesión y obtener estadísticas.
// Puedes agregar más funciones según los endpoints disponibles en el backend.

const API_BASE_URL = 'https://proactive-bravery-production.up.railway.app/api'; 

async function fetchJuegos() {
    const response = await fetch(`${API_BASE_URL}/juegos`);
    if (!response.ok) throw new Error('Error fetching juegos');
    return response.json();
}

async function loginUsuario(credentials) {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
}

async function fetchEstadisticas() {
    const response = await fetch(`${API_BASE_URL}/estadisticas`);
    if (!response.ok) throw new Error('Error fetching estadisticas');
    return response.json();
}

// Puedes agregar más funciones según los endpoints de tu backend

export {
    fetchJuegos,
    loginUsuario,
    fetchEstadisticas,
};