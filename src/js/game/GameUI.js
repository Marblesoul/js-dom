export default class GameUI {
  constructor(container) {
    this.container = container;
    this.scoreElement = null;
    this.missesElement = null;
    this.startButton = null;
    this.overlay = null;
    this.overlayScore = null;
    this.restartButton = null;
  }

  render() {
    // Controls
    const controls = document.createElement('div');
    controls.className = 'game-controls';

    this.startButton = document.createElement('button');
    this.startButton.className = 'game-button';
    this.startButton.textContent = 'Начать игру';
    controls.append(this.startButton);

    // Stats
    const stats = document.createElement('div');
    stats.className = 'game-stats';

    this.scoreElement = document.createElement('span');
    this.scoreElement.className = 'game-score';
    this.scoreElement.textContent = 'Очки: 0';

    this.missesElement = document.createElement('span');
    this.missesElement.className = 'game-misses';
    this.missesElement.textContent = 'Промахи: 0 / 5';

    stats.append(this.scoreElement, this.missesElement);

    // Game Over overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'game-over-overlay';
    this.overlay.hidden = true;

    const content = document.createElement('div');
    content.className = 'game-over-content';

    const title = document.createElement('h2');
    title.textContent = 'Игра окончена!';

    this.overlayScore = document.createElement('p');
    this.overlayScore.className = 'game-over-score';

    this.restartButton = document.createElement('button');
    this.restartButton.className = 'game-button';
    this.restartButton.textContent = 'Играть снова';

    content.append(title, this.overlayScore, this.restartButton);
    this.overlay.append(content);

    this.container.prepend(stats);
    this.container.prepend(controls);
    this.container.append(this.overlay);
  }

  updateScore(score) {
    this.scoreElement.textContent = `Очки: ${score}`;
  }

  updateMisses(misses) {
    this.missesElement.textContent = `Промахи: ${misses} / 5`;
  }

  showGameOver(score) {
    this.overlayScore.textContent = `Ваш счёт: ${score}`;
    this.overlay.hidden = false;
  }

  hideGameOver() {
    this.overlay.hidden = true;
  }

  onStart(callback) {
    this.startButton.addEventListener('click', callback);
    this.restartButton.addEventListener('click', callback);
  }
}
