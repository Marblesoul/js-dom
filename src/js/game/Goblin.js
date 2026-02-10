import goblinImg from '../../img/goblin.png';

export default class Goblin {
  constructor() {
    this.element = this._createElement();
    this.position = -1;
  }

  _createElement() {
    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'Goblin';
    img.className = 'goblin';
    return img;
  }

  show(cell, position) {
    cell.append(this.element);
    this.position = position;
  }

  hide() {
    this.element.remove();
    this.position = -1;
  }

  isAt(position) {
    return this.position === position;
  }

  getRandomPosition(exclude, total) {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * total);
    } while (newPosition === exclude);
    return newPosition;
  }
}
