import Board from './Board';
import Goblin from './Goblin';
import GameUI from './GameUI';

const MAX_MISSES = 5;
const ROUND_TIMEOUT = 1000;

export default class Game {
  constructor(container) {
    this.container = container;
    this.board = new Board(container);
    this.goblin = new Goblin();
    this.ui = new GameUI(container);
    this.score = 0;
    this.misses = 0;
    this.isRunning = false;
    this.timerId = null;
  }

  init() {
    this.board.render();
    this.ui.render();

    this.board.onClick((index) => {
      if (!this.isRunning) return;
      if (this.goblin.isAt(index)) {
        this.handleHit();
      }
    });

    this.ui.onStart(() => this.start());
  }

  start() {
    this.score = 0;
    this.misses = 0;
    this.isRunning = true;

    this.ui.updateScore(this.score);
    this.ui.updateMisses(this.misses);
    this.ui.hideGameOver();
    this.goblin.hide();

    this.nextRound();
  }

  nextRound() {
    const position = this.goblin.getRandomPosition(this.goblin.position, this.board.totalCells);
    const cell = this.board.getCell(position);
    this.goblin.show(cell, position);

    this.timerId = setTimeout(() => {
      this.handleMiss();
    }, ROUND_TIMEOUT);
  }

  handleHit() {
    clearTimeout(this.timerId);
    this.score += 1;
    this.ui.updateScore(this.score);
    this.goblin.hide();
    this.nextRound();
  }

  handleMiss() {
    this.misses += 1;
    this.ui.updateMisses(this.misses);
    this.goblin.hide();

    if (this.misses >= MAX_MISSES) {
      this.end();
    } else {
      this.nextRound();
    }
  }

  end() {
    this.isRunning = false;
    clearTimeout(this.timerId);
    this.ui.showGameOver(this.score);
  }
}

export { MAX_MISSES, ROUND_TIMEOUT };
