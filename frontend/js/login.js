const API_URL = 'http://localhost:3000/api/login';

const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dni = document.getElementById('dni').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dni, password })
        });

        const data = await response.json();

        console.log('Respuesta login:', data);

        if (!data.success) {
            mensaje.textContent = data.message || 'Credenciales incorrectas';
            mensaje.style.color = 'red';
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        if (data.rol === 'admin') {
            window.location.href = './dashboard-admin.html';
        } else if (data.rol === 'doctor') {
            window.location.href = './dashboard-doctor.html';
        } else if (data.rol === 'paciente') {
            window.location.href = './dashboard-paciente.html';
        } else {
            mensaje.textContent = 'Rol no reconocido';
        }

    } catch (error) {
        console.error('Error en login:', error);
        mensaje.textContent = 'No se pudo conectar con el servidor';
        mensaje.style.color = 'red';
    }
});