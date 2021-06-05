
function decToHex(number) {
  const hex = Number(number).toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${decToHex(Number(r))}${decToHex(Number(g))}${decToHex(Number(b))}`;
}

function colorChange(event) {
  const { target } = event;
  const selected = document.querySelector('.selected');
  selected.style.backgroundColor = target.value;
}

function clickColorChange(event) {
  const selected = document.querySelector('.selected');
  const colorInput = document.querySelector('#color-input');
  //colorInput.value = selected.style.backgroundColor;
  const [r, g, b] = (selected.style.backgroundColor).slice(4).replace(')','').replace(' ','').replace(' ','').split(',')
  const hex = rgbToHex(r,g,b);
  colorInput.value = hex;
  colorInput.click()
}



function enterSizePress(event) {
  if (event.key === 'Enter') { 
    replaceBoard();
  }
}

function hideHeader(event) {
  const { target } = event;
  const header = document.querySelector('#header')
  if (header.style.marginTop === '-170px') {
    header.style.marginTop = '0px'
    target.innerText = '⬆';
  }else {
    header.style.marginTop = '-170px';
    target.innerText = '⬇';
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
  let board = document.querySelectorAll('.table-row');
  board.forEach((element) => {
    element.remove()    
  });
  // console.log( document.querySelector('#pixel-board'));
  // board = document.createElement('div');
  // board.id = '#pixel-board';
  // document.body.appendChild(board);
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
  const colors = ['rgb(0, 0, 0)'];
  for (let index = 0; index < number-1; index += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const hex = rgbToHex(r, g, b);
    colors.push(hex);
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
//vqvBtn.addEventListener('click', replaceBoard);
createBoard(5);
addColorToColorPalette(randomColors(8));
addSelectedAllPalette();
const btn = document.querySelector('#clear-board');
btn.addEventListener('click', clearBoard);
