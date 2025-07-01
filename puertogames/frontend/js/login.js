document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        try {
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
