// Hace fetch directo a la API de RAWG al hacer clic en una card y muestra detalles en un modal

const RAWG_API_KEY = 'a7104160559046f59814743992c5f5b9'; // Usa tu propia API Key

// Renderizar cards de juegos (toda la card es clickeable)
function renderGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    gamesContainer.innerHTML = Object.keys(games).map(gameId => {
        const game = games[gameId];
        return `
            <div class="game-card bg-gray-800 rounded-xl shadow-lg border border-orange-600 flex flex-col cursor-pointer hover:ring-2 hover:ring-orange-500 transition" onclick="showGameDetailsRAWG('${game.title}')">
                <img src="${game.image}" alt="${game.title}" class="rounded-t-xl h-48 w-full object-cover">
                <div class="p-4 flex-1 flex flex-col">
                    <h2 class="text-lg font-bold text-white mb-2">${game.title}</h2>
                    <p class="text-sm text-gray-300 mb-2 line-clamp-2">${game.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Mostrar detalles usando API RAWG directamente desde el frontend
async function showGameDetailsRAWG(title) {
    try {
        const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(title)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data || !data.results || data.results.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Sin información',
                text: 'No se encontró información detallada para este juego en RAWG.'
            });
            return;
        }
        const juego = data.results[0];
        Swal.fire({
            title: `<span class='text-2xl font-bold text-gray-800'>${juego.name}</span>`,
            html: `
                <div class='text-left'>
                    <img src='${juego.background_image || ''}' alt='${juego.name}' class='w-full rounded-lg shadow-md border border-gray-200 mb-4'>
                    <p class='text-gray-700 mb-2'><b>Fecha de lanzamiento:</b> ${juego.released || 'Desconocida'}</p>
                    <p class='text-gray-700 mb-2'><b>Géneros:</b> ${(juego.genres || []).map(g => g.name).join(', ') || 'N/A'}</p>
                    <p class='text-gray-700 mb-2'><b>Plataformas:</b> ${(juego.platforms || []).map(p => p.platform.name).join(', ') || 'N/A'}</p>
                    <p class='text-gray-700 mb-2'><b>Rating:</b> ${juego.rating || 'N/A'}</p>
                    <p class='text-gray-700 mt-4'>${juego.description_raw || 'Sin descripción detallada.'}</p>
                </div>
            `,
            width: '700px',
            showConfirmButton: false,
            showCloseButton: true,
            background: 'white',
            backdrop: 'rgba(0,0,0,0.5)',
            customClass: {
                closeButton: 'text-gray-400 hover:text-gray-600 text-2xl',
                popup: 'rounded-xl shadow-2xl'
            }
        });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener información detallada del juego.'
        });
    }
}

// Filtros (igual que antes)
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const platformFilter = document.getElementById('platformFilter').value;
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        const platform = card.getAttribute('data-platform');
        
        const matchesSearch = title.includes(searchTerm);
        const matchesPlatform = platformFilter === '' || platform === platformFilter;
        
        if (matchesSearch && matchesPlatform) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    document.getElementById('searchInput').addEventListener('input', filterGames);
    document.getElementById('platformFilter').addEventListener('change', filterGames);
});
