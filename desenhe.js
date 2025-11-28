// 1. Configuração Inicial e Variáveis
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d'); // O contexto 2D é o que permite desenhar
const colorPicker = document.getElementById('colorPicker');
const lineWidthRange = document.getElementById('lineWidth');
const clearButton = document.getElementById('clearButton');

let isDrawing = false; // Flag que indica se o mouse está pressionado
let lastX = 0; // Última posição X
let lastY = 0; // Última posição Y

// Configurações iniciais do pincel
ctx.strokeStyle = colorPicker.value; // Cor inicial
ctx.lineWidth = lineWidthRange.value; // Espessura inicial
ctx.lineCap = 'round'; // As pontas das linhas serão arredondadas
ctx.lineJoin = 'round'; // As junções das linhas também serão arredondadas

// 2. Funções de Evento do Mouse

// Inicia o desenho (mouse down)
function startDrawing(e) {
    isDrawing = true;
    // Obtém a posição X e Y do mouse em relação ao Canvas
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Desenha a linha (mouse move)
function draw(e) {
    if (!isDrawing) return; // Só desenha se o mouse estiver pressionado

    // Inicia um novo caminho de desenho
    ctx.beginPath(); 
    
    // Move o "lápis" para o ponto anterior
    ctx.moveTo(lastX, lastY); 
    
    // Desenha uma linha até a posição atual do mouse
    ctx.lineTo(e.offsetX, e.offsetY); 
    
    // Aplica o traço com a cor e espessura definidas
    ctx.stroke(); 

    // Atualiza a última posição para que a próxima linha comece de onde esta terminou
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Para o desenho (mouse up ou mouse leave)
function stopDrawing() {
    isDrawing = false;
}

// 3. Funções de Controle

// Altera a cor do pincel
function changeColor() {
    ctx.strokeStyle = colorPicker.value;
}

// Altera a espessura do pincel
function changeLineWidth() {
    ctx.lineWidth = lineWidthRange.value;
}

// Limpa todo o canvas
function clearCanvas() {
    // Apaga o retângulo que cobre toda a área do canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 4. Atribuição de Eventos
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

colorPicker.addEventListener('change', changeColor);
lineWidthRange.addEventListener('input', changeLineWidth);
clearButton.addEventListener('click', clearCanvas);



/*aqui fica as luzes de nata*/
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lights-container');
    const numberOfLights = 100; // Mais luzes para preencher melhor
    const colors = ['#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#FF1493', '#8A2BE2']; 
    
    // Captura as dimensões da viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calcula o perímetro para distribuição uniforme
    const perimeter = (2 * viewportWidth) + (2 * viewportHeight);
    const spacing = perimeter / numberOfLights;
    
    let currentDistance = 0;
    const allLights = [];

    function createLight(distance) {
        const light = document.createElement('div');
        light.classList.add('light-bulb');
        
        // Define uma cor aleatória
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        light.style.color = randomColor;

        // Lógica de Posicionamento ao longo do perímetro (Topo, Direita, Baixo, Esquerda)
        if (distance < viewportWidth) {
            // BORDA SUPERIOR
            light.style.top = '0px';
            light.style.left = `${distance}px`;
        } else if (distance < (viewportWidth + viewportHeight)) {
            // BORDA DIREITA
            const sideDistance = distance - viewportWidth;
            light.style.top = `${sideDistance}px`;
            light.style.right = '0px';
        } else if (distance < (2 * viewportWidth + viewportHeight)) {
            // BORDA INFERIOR
            const bottomDistance = distance - (viewportWidth + viewportHeight);
            light.style.bottom = '0px';
            light.style.right = `${bottomDistance}px`; 
        } else {
            // BORDA ESQUERDA
            const leftDistance = distance - (2 * viewportWidth + viewportHeight);
            light.style.bottom = `${leftDistance}px`; 
            light.style.left = '0px';
        }

        container.appendChild(light);
        return light;
    }

    // Loop para criar as lâmpadas e distribuí-las
    for (let i = 0; i < numberOfLights; i++) {
        const lightElement = createLight(currentDistance);
        allLights.push(lightElement);
        currentDistance += spacing; 
    }
    
    // Função de Animação (Piscar Irregular)
    function twinkleLights() {
        allLights.forEach(light => {
            // Chance de 35% de a lâmpada mudar de estado a cada ciclo
            if (Math.random() < 0.35) {
                light.classList.toggle('on'); 
            }
        });
    }

    // Faz a animação parecer mais suave e rápida
    setInterval(twinkleLights, 150); 
});