// external.js

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

// Llamar a la función al cargar el archivo
document.addEventListener('DOMContentLoaded', showTriviaQuestions);