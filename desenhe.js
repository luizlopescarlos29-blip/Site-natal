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