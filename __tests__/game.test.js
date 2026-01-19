/**
 * @jest-environment jsdom
 */

import {
  createBoard,
  getRandomPosition,
  createGoblin,
  moveGoblin,
  BOARD_SIZE,
} from '../src/js/game';

describe('Game module', () => {
  describe('createBoard', () => {
    it('should create a board with 16 cells (4x4)', () => {
      const container = document.createElement('div');
      const board = createBoard(container);

      const cells = board.querySelectorAll('.game-cell');
      expect(cells.length).toBe(BOARD_SIZE * BOARD_SIZE);
    });

    it('should add board to container', () => {
      const container = document.createElement('div');
      createBoard(container);

      expect(container.querySelector('.game-board')).not.toBeNull();
    });

    it('should assign data-index to each cell', () => {
      const container = document.createElement('div');
      const board = createBoard(container);
      const cells = board.querySelectorAll('.game-cell');

      cells.forEach((cell, index) => {
        expect(cell.dataset.index).toBe(String(index));
      });
    });
  });

  describe('getRandomPosition', () => {
    it('should return a number between 0 and 15', () => {
      for (let i = 0; i < 100; i++) {
        const position = getRandomPosition(-1);
        expect(position).toBeGreaterThanOrEqual(0);
        expect(position).toBeLessThan(BOARD_SIZE * BOARD_SIZE);
      }
    });

    it('should not return the excluded position', () => {
      const excludePosition = 5;

      for (let i = 0; i < 100; i++) {
        const position = getRandomPosition(excludePosition);
        expect(position).not.toBe(excludePosition);
      }
    });
  });

  describe('createGoblin', () => {
    it('should create an img element', () => {
      const goblin = createGoblin();
      expect(goblin.tagName).toBe('IMG');
    });

    it('should have goblin class', () => {
      const goblin = createGoblin();
      expect(goblin.classList.contains('goblin')).toBe(true);
    });
  });

  describe('moveGoblin', () => {
    it('should move goblin to a different cell', () => {
      const container = document.createElement('div');
      const board = createBoard(container);
      const cells = board.querySelectorAll('.game-cell');
      const goblin = createGoblin();

      // Place goblin in first cell
      cells[0].appendChild(goblin);

      // Move goblin
      const newPosition = moveGoblin(goblin, cells);

      // Goblin should be in new cell
      expect(cells[newPosition].contains(goblin)).toBe(true);
    });
  });
});
