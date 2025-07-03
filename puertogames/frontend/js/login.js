// login.js
// Lógica de manejo de login de usuario en el frontend
// Envía los datos al backend y muestra mensajes de error o éxito

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    // Maneja el envío del formulario de login
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        try {
            // Petición al backend para login
            const res = await fetch('/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `nombreUsuario=${encodeURIComponent(username)}&contrasena=${encodeURIComponent(password)}`
            });
            const ok = await res.json();
            if (ok === true) {
                localStorage.setItem('session', username);
                window.location.href = 'index.html';
            } else {
                errorMsg.textContent = 'Usuario o contraseña incorrectos';
                errorMsg.classList.remove('hidden');
            }
        } catch (e) {
            errorMsg.textContent = 'Error al conectar con el servidor';
            errorMsg.classList.remove('hidden');
        }
    });
});
