const BOARD_SIZE = 4;

export default class Board {
  constructor(container) {
    this.container = container;
    this.element = null;
    this.cells = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'game-board';

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const cell = document.createElement('div');
      cell.className = 'game-cell';
      cell.dataset.index = i;
      this.element.append(cell);
    }

    this.container.append(this.element);
    this.cells = [...this.element.querySelectorAll('.game-cell')];
    return this.element;
  }

  getCell(index) {
    return this.cells[index];
  }

  onClick(callback) {
    this.element.addEventListener('click', (event) => {
      const cell = event.target.closest('.game-cell');
      if (!cell) return;
      const index = Number(cell.dataset.index);
      callback(index);
    });
  }

  get totalCells() {
    return BOARD_SIZE * BOARD_SIZE;
  }
}

export { BOARD_SIZE };
