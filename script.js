//  requisito 10

function createBoard(n) {
  const board = document.createElement('div');
  board.id = 'pixel-board';
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
  document.body.appendChild(board);
}

function deleteBoard() {
  const board = document.querySelector('#pixel-board');
  board.remove();
}

// requisito 11
function cropBoardSize(n) {
  if (n < 5) return 5;
  if (n > 50) return 50;
  return n;
}

function replaceBoard() {
  let n = document.querySelector('#board-size').value;
  if (n === '') return window.alert('Board inválido!');
  deleteBoard();
  n = cropBoardSize(Number(n));
  createBoard(n);
}

const vqvBtn = document.querySelector('#generate-board');
vqvBtn.addEventListener('click', replaceBoard);

// inicio do projeto
createBoard(5);

// colocando cor nas divs
function addColorToColorPalette(colors) {
  const divs = document.querySelectorAll('.color');
  for (let index = 0; index < colors.length; index += 1) {
    divs[index].style.backgroundColor = colors[index];
  }
}

function randomFourColors() {
  const colors = ['black'];
  for (let index = 0; index < 3; index += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
}

addColorToColorPalette(randomFourColors());

function colorSetSelected(event) {
  const previousSelected = document.querySelector('.color.selected');
  previousSelected.classList.remove('selected');
  event.target.classList.add('selected');
}
function addSelectedAllPalette() {
  const allPalette = document.querySelectorAll('.color');
  for (let index = 0; index < allPalette.length; index += 1) {
    allPalette[index].addEventListener('click', colorSetSelected);
  }
}
addSelectedAllPalette();

// requisito 7

function addColorPixel(event) {
  // const test = event;
  const { target } = event;
  const selected = document.querySelector('.color.selected');
  target.style.backgroundColor = selected.style.backgroundColor;
}

function addPixelsListener() {
  const pixelsList = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelsList.length; index += 1) {
    pixelsList[index].addEventListener('click', addColorPixel);
  }
}
addPixelsListener();

//  requisito 9

function clearBoard() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    allPixels[index].style.backgroundColor = 'white';
  }
}

const btn = document.querySelector('#clear-board');
btn.addEventListener('click', clearBoard);
