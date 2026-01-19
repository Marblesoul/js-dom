import goblinImg from '../img/goblin.png';

const BOARD_SIZE = 4;
const MOVE_INTERVAL = 1000;

let currentPosition = -1;
let intervalId = null;

export function createBoard(container) {
  const board = document.createElement('div');
  board.className = 'game-board';

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'game-cell';
    cell.dataset.index = i;
    board.appendChild(cell);
  }

  container.appendChild(board);
  return board;
}

export function getRandomPosition(excludePosition) {
  const totalCells = BOARD_SIZE * BOARD_SIZE;
  let newPosition;

  do {
    newPosition = Math.floor(Math.random() * totalCells);
  } while (newPosition === excludePosition);

  return newPosition;
}

export function createGoblin() {
  const goblin = document.createElement('img');
  goblin.src = goblinImg;
  goblin.alt = 'Goblin';
  goblin.className = 'goblin';
  return goblin;
}

export function moveGoblin(goblin, cells) {
  const newPosition = getRandomPosition(currentPosition);
  const targetCell = cells[newPosition];

  // appendChild automatically moves the element (no need for removeChild)
  targetCell.appendChild(goblin);
  currentPosition = newPosition;

  return newPosition;
}

export function initGame(container) {
  const board = createBoard(container);
  const cells = board.querySelectorAll('.game-cell');
  const goblin = createGoblin();

  // Place goblin in random initial position
  currentPosition = getRandomPosition(-1);
  cells[currentPosition].appendChild(goblin);

  // Start moving goblin
  intervalId = setInterval(() => {
    moveGoblin(goblin, cells);
  }, MOVE_INTERVAL);

  return { board, goblin, intervalId };
}

export function stopGame() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Export for testing
export { BOARD_SIZE, MOVE_INTERVAL };
