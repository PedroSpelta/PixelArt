

function hideHeader(event) {
  const { target } = event;
  console.log(target);
  const header = document.querySelector('#header')
  if (header.style.display === 'none') {
    header.style.display = ''
    target.innerText = '⬆';
    console.log(target);
  }else {
    header.style.display = 'none';
    target.innerText = '⬇';
    console.log(target);
  }
}

function previewOn(event) {
  const { target } = event;
  const selected = document.querySelector('.selected')
  target.colorSaved = target.style.backgroundColor;
  target.style.backgroundColor = selected.style.backgroundColor;
}

function previewOf(event) {
  const { target } = event;
  target.style.backgroundColor = target.colorSaved;
}

function resizeBoard() {
  const board = document.querySelector('#pixel-board')
  const input = document.querySelector('#board-range')
  board.style.height = `${input.value}px`;
  board.style.width = `${input.value}px`;
  const pixel = document.querySelectorAll('.pixel');
  const sideSize = Math.sqrt(pixel.length);
  pixel.forEach((element) => {
    element.style.height = `${input.value / sideSize}px`
    element.style.width = `${input.value / sideSize}px` 
  });
}

// cria um board com n lados

// function createBoard(n) {
//   const board = document.querySelector('#pixel-board');
//   for (let index = 0; index < (n**2); index += 1) {
//     const pixel = document.createElement('div');
//     pixel.classList.add('pixel');
//     board.appendChild(pixel);
//   }
//   resizeBoard(board);
//   addPixelsListener();
// }
function createBoard(n) {
  const board = document.querySelector('#pixel-board');
  for (let index = 0; index < n; index += 1) {
    const row = document.createElement('div');
    row.classList.add('table-row');
    for (let index2 = 0; index2 < n; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      row.appendChild(pixel);
    }
    board.appendChild(row);
  }
  resizeBoard(board);
  addPixelsListener();
}

//deleta o board que está dentro da id pixel board
function deleteBoard() {
  const board = document.querySelector('#pixel-board');
  board.remove();
}

// define tamanho máximo e minimo pro n
function cropBoardSize(n) {
  if (n < 5) return 5;
  if (n > 50) return 50;
  return n;
}

//recria o board com o lado = o input
function replaceBoard() {
  let n = document.querySelector('#board-size').value;
  if (n === '') return window.alert('Board inválido!');
  deleteBoard();
  n = cropBoardSize(Number(n));
  createBoard(n);
}

// coloca cor do array [colors] na palete de cores
function addColorToColorPalette(colors) {
  const divs = document.querySelectorAll('.color');
  for (let index = 0; index < colors.length; index += 1) {
    divs[index].style.backgroundColor = colors[index];
  }
}

// coloca cor aleatoria na paleta, sendo a primeira sempre black
function randomColors(number) {
  const colors = ['black'];
  for (let index = 0; index < number-1; index += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
}

// atribui selected no parametro, que deve ser uma div da palette
function colorSetSelected(event) {
  const previousSelected = document.querySelector('.color.selected');
  previousSelected.classList.remove('selected');
  event.target.classList.add('selected');
}

// adiciona o listener para toda a palette
function addSelectedAllPalette() {
  const allPalette = document.querySelectorAll('.color');
  for (let index = 0; index < allPalette.length; index += 1) {
    allPalette[index].addEventListener('click', colorSetSelected);
  }
}

// pinta um pixel com a cor da palette selected
function addColorPixel(event) {
  const { target } = event;
  const selected = document.querySelector('.color.selected');
  target.colorSaved = selected.style.backgroundColor;
}

// adciona o listener para todos os pixels
function addPixelsListener() {
  const pixelsList = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelsList.length; index += 1) {
    pixelsList[index].addEventListener('click', addColorPixel);
    pixelsList[index].addEventListener('mouseenter', previewOn);
    pixelsList[index].addEventListener('mouseleave', previewOf);
  }
}

// limpa a cor de todos os pixels
function clearBoard() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    allPixels[index].style.backgroundColor = 'white';
  }
}

function inputSizeChange() {
  resizeBoard();
}

// chamando as funçoes
const vqvBtn = document.querySelector('#generate-board');
vqvBtn.addEventListener('click', replaceBoard);
createBoard(5);
addColorToColorPalette(randomColors(8));
addSelectedAllPalette();
const btn = document.querySelector('#clear-board');
btn.addEventListener('click', clearBoard);
