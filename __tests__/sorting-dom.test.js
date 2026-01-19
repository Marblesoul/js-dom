/**
 * @jest-environment jsdom
 */

import {
  generateTable,
  sortByDataAttribute,
  movies,
} from '../src/js/sorting-dom';

describe('Sorting DOM module', () => {
  describe('generateTable', () => {
    it('should create a table with correct number of rows', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      const rows = table.querySelectorAll('tbody tr');
      expect(rows.length).toBe(movies.length);
    });

    it('should add data-* attributes to each row', () => {
      const container = document.createElement('div');
      const table = generateTable(container);
      const firstRow = table.querySelector('tbody tr');

      expect(firstRow.dataset.id).toBeDefined();
      expect(firstRow.dataset.title).toBeDefined();
      expect(firstRow.dataset.year).toBeDefined();
      expect(firstRow.dataset.imdb).toBeDefined();
    });

    it('should create table with 4 columns', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      const headers = table.querySelectorAll('th');
      expect(headers.length).toBe(4);
    });

    it('should format imdb with 2 decimal places', () => {
      const container = document.createElement('div');
      const table = generateTable(container);
      const firstRow = table.querySelector('tbody tr');
      const imdbCell = firstRow.querySelectorAll('td')[3];

      expect(imdbCell.textContent).toMatch(/imdb: \d+\.\d{2}/);
    });
  });

  describe('sortByDataAttribute', () => {
    it('should sort by id ascending', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      sortByDataAttribute(table, 'id', 'asc');

      const rows = table.querySelectorAll('tbody tr');
      const ids = Array.from(rows).map((row) => parseInt(row.dataset.id, 10));

      for (let i = 1; i < ids.length; i++) {
        expect(ids[i]).toBeGreaterThanOrEqual(ids[i - 1]);
      }
    });

    it('should sort by id descending', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      sortByDataAttribute(table, 'id', 'desc');

      const rows = table.querySelectorAll('tbody tr');
      const ids = Array.from(rows).map((row) => parseInt(row.dataset.id, 10));

      for (let i = 1; i < ids.length; i++) {
        expect(ids[i]).toBeLessThanOrEqual(ids[i - 1]);
      }
    });

    it('should sort by title ascending', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      sortByDataAttribute(table, 'title', 'asc');

      const rows = table.querySelectorAll('tbody tr');
      const titles = Array.from(rows).map((row) => row.dataset.title);

      // Check that array is sorted (compare adjacent pairs)
      for (let i = 1; i < titles.length; i++) {
        expect(titles[i] >= titles[i - 1]).toBe(true);
      }
    });

    it('should add sorted-asc class to header when sorting ascending', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      sortByDataAttribute(table, 'id', 'asc');

      const idHeader = table.querySelector('th[data-field="id"]');
      expect(idHeader.classList.contains('sorted-asc')).toBe(true);
    });

    it('should add sorted-desc class to header when sorting descending', () => {
      const container = document.createElement('div');
      const table = generateTable(container);

      sortByDataAttribute(table, 'id', 'desc');

      const idHeader = table.querySelector('th[data-field="id"]');
      expect(idHeader.classList.contains('sorted-desc')).toBe(true);
    });
  });
});
