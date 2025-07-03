// charts.js
// Lógica para obtener datos de juegos y mostrar gráficos estadísticos usando Chart.js
// Incluye funciones para agrupar datos y crear gráficos de género, plataforma, etc.

// Suponiendo que tienes Chart.js incluido en tu HTML
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// Función para obtener todos los juegos del backend
async function fetchJuegos() {
    const response = await fetch('/api/juegos');
    if (!response.ok) throw new Error('Error al obtener juegos');
    return await response.json();
}

// Funciones para agrupar datos por campo
function agruparPor(juegos, campo) {
    const conteo = {};
    juegos.forEach(j => {
        const valor = j[campo] || 'Desconocido';
        conteo[valor] = (conteo[valor] || 0) + 1;
    });
    return {
        labels: Object.keys(conteo),
        data: Object.values(conteo)
    };
}

// Función para crear un gráfico con Chart.js
function crearGrafico(ctx, tipo, etiquetas, datos, titulo) {
    return new Chart(ctx, {
        type: tipo,
        data: {
            labels: etiquetas,
            datasets: [{
                label: titulo,
                data: datos,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: titulo }
            }
        }
    });
}

// Inicializar los gráficos al cargar la página
async function initCharts() {
    try {
        const juegos = await fetchJuegos();
        // 1. Juegos por Género (Gráfico de barras)
        const generoData = agruparPor(juegos, 'genero');
        crearGrafico(
            document.getElementById('graficoGenero').getContext('2d'),
            'bar',
            generoData.labels,
            generoData.data,
            'Juegos por Género'
        );

        // 2. Juegos por Plataforma (Gráfico de pastel)
        const plataformaData = agruparPor(juegos, 'plataforma');
        crearGrafico(
            document.getElementById('graficoPlataforma').getContext('2d'),
            'pie',
            plataformaData.labels,
            plataformaData.data,
            'Juegos por Plataforma'
        );

        // 3. Juegos por Año (Gráfico de líneas)
        const anioData = agruparPor(juegos, 'anio');
        crearGrafico(
            document.getElementById('graficoAnio').getContext('2d'),
            'line',
            anioData.labels,
            anioData.data,
            'Juegos por Año'
        );

        // 4. Juegos por Desarrollador (Gráfico de barras horizontales)
        const desarrolladorData = agruparPor(juegos, 'desarrollador');
        crearGrafico(
            document.getElementById('graficoDesarrollador').getContext('2d'),
            'bar',
            desarrolladorData.labels,
            desarrolladorData.data,
            'Juegos por Desarrollador'
        );
    } catch (error) {
        console.error('Error al inicializar los gráficos:', error);
    }
}

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', initCharts);