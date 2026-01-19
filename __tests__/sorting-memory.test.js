/**
 * @jest-environment jsdom
 */

import {
  sortMovies,
  renderTable,
  moviesData,
} from '../src/js/sorting-memory';

describe('Sorting Memory module', () => {
  describe('sortMovies', () => {
    it('should sort by id ascending', () => {
      const sorted = sortMovies(moviesData, 'id', 'asc');

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].id).toBeGreaterThanOrEqual(sorted[i - 1].id);
      }
    });

    it('should sort by id descending', () => {
      const sorted = sortMovies(moviesData, 'id', 'desc');

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].id).toBeLessThanOrEqual(sorted[i - 1].id);
      }
    });

    it('should sort by title ascending', () => {
      const sorted = sortMovies(moviesData, 'title', 'asc');

      // Check that array is sorted (compare adjacent pairs)
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].title >= sorted[i - 1].title).toBe(true);
      }
    });

    it('should sort by imdb descending', () => {
      const sorted = sortMovies(moviesData, 'imdb', 'desc');

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].imdb).toBeLessThanOrEqual(sorted[i - 1].imdb);
      }
    });

    it('should not mutate original array', () => {
      const originalLength = moviesData.length;
      const originalFirstId = moviesData[0].id;

      sortMovies(moviesData, 'id', 'desc');

      expect(moviesData.length).toBe(originalLength);
      expect(moviesData[0].id).toBe(originalFirstId);
    });
  });

  describe('renderTable', () => {
    it('should create a table with correct number of rows', () => {
      const container = document.createElement('div');
      renderTable(container, moviesData);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(moviesData.length);
    });

    it('should add data-* attributes to each row', () => {
      const container = document.createElement('div');
      renderTable(container, moviesData);

      const firstRow = container.querySelector('tbody tr');
      expect(firstRow.dataset.id).toBeDefined();
      expect(firstRow.dataset.title).toBeDefined();
      expect(firstRow.dataset.year).toBeDefined();
      expect(firstRow.dataset.imdb).toBeDefined();
    });

    it('should add sorted-asc class when sortDirection is asc', () => {
      const container = document.createElement('div');
      renderTable(container, moviesData, 'id', 'asc');

      const idHeader = container.querySelector('th[data-field="id"]');
      expect(idHeader.classList.contains('sorted-asc')).toBe(true);
    });

    it('should add sorted-desc class when sortDirection is desc', () => {
      const container = document.createElement('div');
      renderTable(container, moviesData, 'id', 'desc');

      const idHeader = container.querySelector('th[data-field="id"]');
      expect(idHeader.classList.contains('sorted-desc')).toBe(true);
    });

    it('should clear container before rendering', () => {
      const container = document.createElement('div');
      container.innerHTML = '<p>Old content</p>';

      renderTable(container, moviesData);

      expect(container.querySelector('p')).toBeNull();
      expect(container.querySelector('table')).not.toBeNull();
    });

    it('should format imdb with 2 decimal places', () => {
      const container = document.createElement('div');
      renderTable(container, moviesData);

      const firstRow = container.querySelector('tbody tr');
      const imdbCell = firstRow.querySelectorAll('td')[3];

      expect(imdbCell.textContent).toMatch(/imdb: \d+\.\d{2}/);
    });
  });
});
