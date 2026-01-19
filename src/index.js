import './css/style.css';
import { initGame } from './js/game';
import { initSortingDom } from './js/sorting-dom';
import { initSortingMemory } from './js/sorting-memory';

document.addEventListener('DOMContentLoaded', () => {
  // Task 1: Goblin game
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    initGame(gameContainer);
  }

  // Task 2: Sorting with data-attributes
  const sortingDomContainer = document.getElementById('sorting-dom-container');
  if (sortingDomContainer) {
    initSortingDom(sortingDomContainer);
  }

  // Task 3: Sorting in-memory
  const sortingMemoryContainer = document.getElementById('sorting-memory-container');
  if (sortingMemoryContainer) {
    initSortingMemory(sortingMemoryContainer);
  }
});
