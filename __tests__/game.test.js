/**
 * @jest-environment jsdom
 */

import Board, { BOARD_SIZE } from '../src/js/game/Board';
import Goblin from '../src/js/game/Goblin';
import GameUI from '../src/js/game/GameUI';
import Game from '../src/js/game/Game';

describe('Board', () => {
  let container;
  let board;

  beforeEach(() => {
    container = document.createElement('div');
    board = new Board(container);
    board.render();
  });

  it('should create 16 cells (4x4)', () => {
    expect(board.cells.length).toBe(BOARD_SIZE * BOARD_SIZE);
  });

  it('should add board element to container', () => {
    expect(container.querySelector('.game-board')).not.toBeNull();
  });

  it('should assign data-index to each cell', () => {
    board.cells.forEach((cell, index) => {
      expect(cell.dataset.index).toBe(String(index));
    });
  });

  it('getCell returns correct cell', () => {
    expect(board.getCell(0)).toBe(board.cells[0]);
    expect(board.getCell(15)).toBe(board.cells[15]);
  });

  it('onClick calls callback with cell index', () => {
    const callback = jest.fn();
    board.onClick(callback);

    board.cells[7].click();
    expect(callback).toHaveBeenCalledWith(7);
  });

  it('totalCells returns 16', () => {
    expect(board.totalCells).toBe(16);
  });
});

describe('Goblin', () => {
  let goblin;

  beforeEach(() => {
    goblin = new Goblin();
  });

  it('should create an img element with goblin class', () => {
    expect(goblin.element.tagName).toBe('IMG');
    expect(goblin.element.classList.contains('goblin')).toBe(true);
  });

  it('show places goblin in cell and sets position', () => {
    const cell = document.createElement('div');
    goblin.show(cell, 5);

    expect(cell.contains(goblin.element)).toBe(true);
    expect(goblin.position).toBe(5);
  });

  it('hide removes goblin from DOM and resets position', () => {
    const cell = document.createElement('div');
    goblin.show(cell, 3);
    goblin.hide();

    expect(cell.contains(goblin.element)).toBe(false);
    expect(goblin.position).toBe(-1);
  });

  it('isAt returns correct result', () => {
    const cell = document.createElement('div');
    goblin.show(cell, 10);

    expect(goblin.isAt(10)).toBe(true);
    expect(goblin.isAt(5)).toBe(false);
  });

  it('getRandomPosition does not return excluded position', () => {
    for (let i = 0; i < 100; i++) {
      const pos = goblin.getRandomPosition(5, 16);
      expect(pos).not.toBe(5);
      expect(pos).toBeGreaterThanOrEqual(0);
      expect(pos).toBeLessThan(16);
    }
  });
});

describe('GameUI', () => {
  let container;
  let ui;

  beforeEach(() => {
    container = document.createElement('div');
    ui = new GameUI(container);
    ui.render();
  });

  it('render creates start button', () => {
    expect(container.querySelector('.game-button')).not.toBeNull();
  });

  it('render creates score and misses elements', () => {
    expect(container.querySelector('.game-score')).not.toBeNull();
    expect(container.querySelector('.game-misses')).not.toBeNull();
  });

  it('render creates hidden game-over overlay', () => {
    const overlay = container.querySelector('.game-over-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay.hidden).toBe(true);
  });

  it('updateScore changes score text', () => {
    ui.updateScore(5);
    expect(ui.scoreElement.textContent).toBe('Очки: 5');
  });

  it('updateMisses changes misses text', () => {
    ui.updateMisses(3);
    expect(ui.missesElement.textContent).toBe('Промахи: 3 / 5');
  });

  it('showGameOver displays overlay with score', () => {
    ui.showGameOver(10);
    expect(ui.overlay.hidden).toBe(false);
    expect(ui.overlayScore.textContent).toBe('Ваш счёт: 10');
  });

  it('hideGameOver hides overlay', () => {
    ui.showGameOver(10);
    ui.hideGameOver();
    expect(ui.overlay.hidden).toBe(true);
  });
});

describe('Game (integration)', () => {
  let container;
  let game;

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement('div');
    game = new Game(container);
    game.init();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('start resets score and misses', () => {
    game.start();
    expect(game.score).toBe(0);
    expect(game.misses).toBe(0);
    expect(game.isRunning).toBe(true);
  });

  it('clicking goblin cell increases score', () => {
    game.start();
    const pos = game.goblin.position;
    game.board.cells[pos].click();

    expect(game.score).toBe(1);
  });

  it('timeout increases misses', () => {
    game.start();
    jest.advanceTimersByTime(1000);

    expect(game.misses).toBe(1);
  });

  it('5 misses end the game', () => {
    game.start();

    for (let i = 0; i < 5; i++) {
      jest.advanceTimersByTime(1000);
    }

    expect(game.isRunning).toBe(false);
    expect(game.misses).toBe(5);
    expect(game.ui.overlay.hidden).toBe(false);
  });

  it('clicking empty cell does not change score', () => {
    game.start();
    const pos = game.goblin.position;
    const emptyIndex = pos === 0 ? 1 : 0;
    game.board.cells[emptyIndex].click();

    expect(game.score).toBe(0);
  });
});
