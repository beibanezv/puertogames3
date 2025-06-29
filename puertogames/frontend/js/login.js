const API_URL = 'http://localhost:3000/api/login'; // Cambia la URL según tu backend

// Función para validar si el usuario ya está logueado
function checkSession() {
    const session = localStorage.getItem('session');
    if (!session) {
        window.location.href = 'login.html';
    }
}

// Función para hacer login
async function login(username, password) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error('Login fallido');
        const data = await response.json();
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = 'index.html'; // Redirige al home o dashboard
    } catch (error) {
        alert('Usuario o contraseña incorrectos');
    }
}

// Ejemplo de uso con un formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = form.elements['username'].value;
            const password = form.elements['password'].value;
            login(username, password);
        });
    } else {
        checkSession();
    }
});