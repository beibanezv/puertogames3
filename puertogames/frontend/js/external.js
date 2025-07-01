// URL de la API de trivia de videojuegos (ejemplo usando Open Trivia DB con categoría videojuegos)
const API_URL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';

// Función para decodificar entidades HTML
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Función para crear una tarjeta de pregunta
function createQuestionCard(questionObj) {
    const card = document.createElement('div');
    card.className = 'trivia-card';

    // Pregunta
    const question = document.createElement('h3');
    question.textContent = decodeHtml(questionObj.question);
    card.appendChild(question);

    // Opciones mezcladas
    const answers = [...questionObj.incorrect_answers, questionObj.correct_answer]
        .map(decodeHtml)
        .sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.onclick = () => {
            if (answer === decodeHtml(questionObj.correct_answer)) {
                btn.style.background = 'lightgreen';
            } else {
                btn.style.background = 'salmon';
            }
            // Deshabilitar todos los botones
            Array.from(card.querySelectorAll('button')).forEach(b => b.disabled = true);
        };
        card.appendChild(btn);
    });

    return card;
}

// Función principal para obtener y mostrar las preguntas
async function showTriviaQuestions() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const container = document.getElementById('trivia-container') || document.body;

        data.results.forEach(q => {
            const card = createQuestionCard(q);
            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error al obtener preguntas de trivia:', err);
    }
}

// --- INICIO NUEVO CÓDIGO PARA JUEGOS DINÁMICOS Y REVIEWS (FreeToGame API) ---

const FREETOGAME_API_URL = '/api/reviews/proxy/freetogame';
const BACKEND_API_URL = '/api/juegos';
const BACKEND_REVIEWS_URL = '/api/reviews';

let allGames = [];

async function loadGames() {
    const container = document.getElementById('games-container');
    container.innerHTML = '<div class="col-span-full text-center text-gray-500">Cargando juegos...</div>';
    let games = [];
    try {
        // FreeToGame API (proxy backend)
        const ftgRes = await fetch(FREETOGAME_API_URL);
        if (!ftgRes.ok) throw new Error('No se pudo conectar con el proxy FreeToGame');
        const ftgData = await ftgRes.json();
        if (!Array.isArray(ftgData)) {
            console.error('Respuesta inesperada del proxy FreeToGame:', ftgData);
            throw new Error('Respuesta inesperada del proxy FreeToGame');
        }
        games = ftgData.slice(0, 12).map(g => ({
            id: g.id,
            title: g.title,
            image: g.thumbnail,
            genre: g.genre,
            platform: g.platform,
            rating: '-',
            description: g.short_description,
            releaseDate: g.release_date,
            developer: g.developer,
            from: 'freetogame'
        }));
        // Backend
        const backendRes = await fetch(BACKEND_API_URL);
        if (backendRes.ok) {
            const backendGames = await backendRes.json();
            games = games.concat(backendGames.map(g => ({
                id: g.id,
                title: g.nombre,
                image: g.imagenUrl || '',
                genre: g.genero,
                platform: g.plataforma,
                rating: g.calificacion,
                description: g.descripcion,
                releaseDate: g.fechaLanzamiento,
                developer: g.desarrollador,
                from: 'backend'
            })));
        }
        if (games.length === 0) {
            showToast('No se encontraron juegos para mostrar', 'error');
        } else {
            showToast('Juegos cargados correctamente', 'success');
        }
    } catch (e) {
        container.innerHTML = '<div class="col-span-full text-center text-red-500">Error al cargar juegos</div>';
        showToast('Error al cargar juegos: ' + e.message, 'error');
        console.error('Error al cargar juegos:', e);
        return;
    }
    allGames = games; // Guardar todos los juegos para búsqueda
    renderGames(games);
}

function renderGames(games) {
    const container = document.getElementById('games-container');
    if (!games.length) {
        container.innerHTML = '<div class="col-span-full text-center text-gray-500">No hay juegos para mostrar</div>';
        return;
    }
    container.innerHTML = games.map(game => `
        <div class="game-card bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-400">
            <img src="${game.image || ''}" alt="${game.title}" class="w-28 h-40 object-cover rounded mb-4 shadow">
            <h2 class="text-xl font-bold mb-2 text-blue-700 text-center">${game.title}</h2>
            <p class="text-gray-600 mb-1"><span class="font-medium">Género:</span> ${game.genre || '-'}</p>
            <p class="text-gray-600 mb-1"><span class="font-medium">Plataforma:</span> ${game.platform || '-'}</p>
            <div class="flex items-center mt-2">
                <div class="text-yellow-400 mr-1">${game.rating && game.rating !== '-' ? '★'.repeat(Math.round(game.rating)) : ''}</div>
                <span class="text-gray-600">${game.rating || '-'}/10</span>
            </div>
            <button onclick="showGameDetailsDinamico('${game.id}','${game.from}')" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                <i class="fas fa-info-circle mr-1"></i> Ver detalles
            </button>
        </div>
    `).join('');
}

async function showGameDetailsDinamico(gameId, from) {
    let game;
    if (from === 'freetogame') {
        const res = await fetch(`${FREETOGAME_API_URL}?id=${gameId}`);
        const data = await res.json();
        game = Array.isArray(data) ? data[0] : data;
        game = {
            id: game.id,
            title: game.title,
            description: game.short_description,
            image: game.thumbnail,
            genre: game.genre,
            platform: game.platform,
            rating: '-',
            releaseDate: game.release_date,
            developer: game.developer,
            from: 'freetogame'
        };
    } else {
        const res = await fetch(`${BACKEND_API_URL}/${gameId}`);
        game = await res.json();
        game = {
            id: game.id,
            title: game.nombre,
            description: game.descripcion,
            image: game.imagenUrl || '',
            genre: game.genero,
            platform: game.plataforma,
            rating: game.calificacion,
            releaseDate: game.fechaLanzamiento,
            developer: game.desarrollador,
            from: 'backend'
        };
    }
    // Cargar reviews
    let reviews = [];
    try {
        const res = await fetch(`${BACKEND_REVIEWS_URL}/juego/${game.id}`);
        if (res.ok) reviews = await res.json();
    } catch {}
    showGameModal(game, reviews);
    showToast('Detalles del juego cargados', 'info');
}

function showGameModal(game, reviews) {
    Swal.fire({
        title: `<span class='text-2xl font-bold text-gray-800'>${game.title}</span>`,
        html: `
            <div class='text-left'>
                <div class='flex flex-col md:flex-row gap-6'>
                    <div class='md:w-2/5'>
                        <img src='${game.image}' alt='${game.title}' class='w-full rounded-lg shadow-md border border-gray-200'>
                        <div class='mt-4 flex justify-between items-center'>
                            <span class='text-3xl font-bold text-purple-600'>${game.rating || '-'}/10</span>
                        </div>
                    </div>
                    <div class='md:w-3/5 space-y-4'>
                        <div class='bg-gray-50 p-4 rounded-lg'>
                            <h3 class='font-semibold text-gray-700 mb-2'>Descripción</h3>
                            <p class='text-gray-700'>${game.description || '-'}</p>
                        </div>
                        <div class='grid grid-cols-2 gap-4 text-sm'>
                            <div class='bg-gray-50 p-3 rounded-lg'>
                                <h4 class='font-semibold text-gray-600 mb-1'>Género</h4>
                                <p class='text-gray-700'>${game.genre || '-'}</p>
                            </div>
                            <div class='bg-gray-50 p-3 rounded-lg'>
                                <h4 class='font-semibold text-gray-600 mb-1'>Plataforma</h4>
                                <p class='text-gray-700'>${game.platform || '-'}</p>
                            </div>
                            <div class='bg-gray-50 p-3 rounded-lg'>
                                <h4 class='font-semibold text-gray-600 mb-1'>Lanzamiento</h4>
                                <p class='text-gray-700'>${game.releaseDate || '-'}</p>
                            </div>
                            <div class='bg-gray-50 p-3 rounded-lg'>
                                <h4 class='font-semibold text-gray-600 mb-1'>Desarrollador</h4>
                                <p class='text-gray-700'>${game.developer || '-'}</p>
                            </div>
                        </div>
                        <div class='bg-blue-50 p-4 rounded-lg'>
                            <h3 class='font-semibold text-blue-800 mb-2'>Reviews</h3>
                            <div id='reviews-list'>
                                ${reviews.length ? reviews.map(r => `<div class='mb-2'><b>${r.usuario ? r.usuario.nombreUsuario : 'Anónimo'}:</b> ${r.comentario} <span class='text-yellow-500'>${'★'.repeat(r.rating)}</span></div>`).join('') : '<span class="text-gray-500">Sin reviews aún.</span>'}
                            </div>
                            <form id='review-form' class='mt-4'>
                                <input type='text' id='review-usuario' placeholder='Tu nombre' class='border rounded px-2 py-1 mr-2' required>
                                <input type='number' id='review-puntuacion' min='1' max='5' placeholder='Puntuación' class='border rounded px-2 py-1 w-16 mr-2' required>
                                <input type='text' id='review-comentario' placeholder='Comentario' class='border rounded px-2 py-1 mr-2' required>
                                <button type='submit' class='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded'>Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `,
        width: '900px',
        showConfirmButton: false,
        showCloseButton: true,
        background: 'white',
        backdrop: 'rgba(0,0,0,0.5)',
        didOpen: () => {
            document.getElementById('review-form').onsubmit = async function(e) {
                e.preventDefault();
                const usuario = document.getElementById('review-usuario').value;
                const puntuacion = document.getElementById('review-puntuacion').value;
                const comentario = document.getElementById('review-comentario').value;
                // Enviar review al backend
                let ok = true;
                try {
                    await fetch(BACKEND_REVIEWS_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            juegoId: game.id,
                            usuarioNombre: usuario,
                            rating: puntuacion,
                            comentario: comentario
                        })
                    });
                } catch {
                    ok = false;
                }
                Swal.close();
                if(ok) showToast('¡Review enviado!', 'success');
                else showToast('Error al enviar review', 'error');
                showGameDetailsDinamico(game.id, game.from || 'backend');
            };
        },
        customClass: {
            closeButton: 'text-gray-400 hover:text-gray-600 text-2xl',
            popup: 'rounded-xl shadow-2xl'
        }
    });
}

// Función utilitaria para mostrar notificaciones Toastify
function showToast(mensaje, tipo = 'info') {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: tipo === 'success' ? '#22c55e' : tipo === 'error' ? '#ef4444' : '#6366f1',
        stopOnFocus: true,
        close: true // Muestra la 'x' para cerrar
    }).showToast();
}

// Ejemplo de uso: showToast('¡Bienvenido a Puerto Games!', 'success');
// Puedes llamar showToast('Mensaje', 'success'|'error'|'info') en cualquier parte del JS

// Buscador simple
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const value = this.value.trim().toLowerCase();
                if (!value) {
                    renderGames(allGames);
                } else {
                    const filtered = allGames.filter(g => g.title.toLowerCase().includes(value));
                    renderGames(filtered);
                }
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    showToast('¡Bienvenido a Puerto Games!', 'info');
    loadGames();
});
// --- FIN NUEVO CÓDIGO ---