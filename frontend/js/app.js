document.addEventListener('DOMContentLoaded', () => {
    cargarEspecialidades();
});

function cargarEspecialidades() {
    fetch('http://localhost:3000/api/especialidades')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('contenedorEspecialidades');

            contenedor.innerHTML = '';

            data.forEach(especialidad => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <h3>${especialidad.nombre}</h3>
                    <p>${especialidad.descripcion}</p>
                `;

                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar especialidades:', error);
        });
}