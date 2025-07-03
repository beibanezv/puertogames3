// rawg.js
// Muestra juegos populares de la API RAWG en el index.html y simula precios
// Incluye funciones para obtener, renderizar y mostrar juegos con precios aleatorios

const RAWG_API_KEY = 'a7104160559046f59814743992c5f5b9';
const RAWG_API_URL = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}`;

// Precios simulados para los juegos (por id de RAWG o por nombre)
const PRECIOS_JUEGOS = {};

// Devuelve o genera un precio aleatorio para un juego
function getPrecioParaJuego(game) {
    // Si ya tiene precio, lo devuelve
    if (PRECIOS_JUEGOS[game.id]) return PRECIOS_JUEGOS[game.id];
    // Si no, genera uno aleatorio entre 19.99 y 69.99 y lo guarda
    const precio = (Math.random() * 50 + 19.99).toFixed(2);
    PRECIOS_JUEGOS[game.id] = precio;
    return precio;
}

let juegosRAWG = [];

// Obtiene juegos de la API y los muestra en pantalla
async function fetchAndDisplayGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    gamesContainer.innerHTML = '<p>Cargando juegos...</p>';
    try {
        const res = await fetch(RAWG_API_URL);
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
            juegosRAWG = data.results;
            renderGames(juegosRAWG);
        } else {
            gamesContainer.innerHTML = '<p>No se encontraron juegos.</p>';
        }
    } catch (e) {
        gamesContainer.innerHTML = '<p>Error al cargar juegos.</p>';
    }
}

// Renderiza los juegos en el contenedor principal
function renderGames(games) {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!games.length) {
        gamesContainer.innerHTML = '<p>No se encontraron juegos.</p>';
        return;
    }
    gamesContainer.innerHTML = games.map(game => {
        const precio = getPrecioParaJuego(game);
        const plataformas = game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A';
        return `
            <div class="game-card bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-400 m-2">
                <img src="${game.background_image}" alt="${game.name}" class="w-28 h-40 object-cover rounded mb-4 shadow game-img"/>
                <h3 class="text-xl font-bold mb-2 text-blue-700 text-center">${game.name}</h3>
                <p class="text-gray-600 mb-1"><span class="font-medium">Género:</span> ${game.genres.map(g=>g.name).join(', ')}</p>
                <p class="text-gray-600 mb-1"><span class="font-medium">Plataforma:</span> ${plataformas}</p>
                <p class="text-gray-600 mb-1"><span class="font-medium">Lanzamiento:</span> ${game.released || 'N/A'}</p>
                <p class="text-gray-600 mb-1"><span class="font-medium">Rating:</span> ${game.rating}</p>
                <p class="text-green-700 font-bold text-lg mt-2">$${precio} USD</p>
                <button class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                    <i class="fas fa-cart-plus mr-1"></i> Comprar
                </button>
            </div>
        `;
    }).join('');
}

// Filtra los juegos según el término de búsqueda y la plataforma seleccionada
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const platformFilter = document.getElementById('platformFilter').value;
    const filtered = juegosRAWG.filter(game => {
        const title = game.name.toLowerCase();
        const platforms = game.platforms ? game.platforms.map(p => p.platform.name) : [];
        const matchesSearch = title.includes(searchTerm);
        // Si el filtro está vacío, muestra todos. Si no, busca coincidencia parcial (case-insensitive)
        const matchesPlatform = !platformFilter || platforms.some(p => p.toLowerCase().includes(platformFilter.toLowerCase()));
        return matchesSearch && matchesPlatform;
    });
    renderGames(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayGames();
    document.getElementById('searchInput').addEventListener('input', filterGames);
    document.getElementById('platformFilter').addEventListener('change', filterGames);
});
