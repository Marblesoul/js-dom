const movies = [
  { id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994 },
  { id: 25, title: 'Крёстный отец', imdb: 9.20, year: 1972 },
  { id: 27, title: 'Крёстный отец 2', imdb: 9.00, year: 1974 },
  { id: 1047, title: 'Тёмный рыцарь', imdb: 9.00, year: 2008 },
  { id: 223, title: 'Криминальное чтиво', imdb: 8.90, year: 1994 },
];

const SORT_INTERVAL = 2000;
const sortStates = [
  { field: 'id', direction: 'asc' },
  { field: 'id', direction: 'desc' },
  { field: 'title', direction: 'asc' },
  { field: 'title', direction: 'desc' },
  { field: 'imdb', direction: 'asc' },
  { field: 'imdb', direction: 'desc' },
  { field: 'year', direction: 'asc' },
  { field: 'year', direction: 'desc' },
];

let currentSortIndex = 0;
let intervalId = null;

export function generateTable(container) {
  const table = document.createElement('table');
  table.className = 'movies-table';

  // Create header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['id', 'title', 'year', 'imdb'];

  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    th.dataset.field = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create body with data-* attributes
  const tbody = document.createElement('tbody');

  movies.forEach((movie) => {
    const tr = document.createElement('tr');
    tr.dataset.id = movie.id;
    tr.dataset.title = movie.title;
    tr.dataset.year = movie.year;
    tr.dataset.imdb = movie.imdb;

    tr.innerHTML = `
      <td>#${movie.id}</td>
      <td>${movie.title}</td>
      <td>(${movie.year})</td>
      <td>imdb: ${movie.imdb.toFixed(2)}</td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  return table;
}

export function sortByDataAttribute(table, field, direction) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    let valueA = a.dataset[field];
    let valueB = b.dataset[field];

    // Convert to numbers for numeric fields
    if (field === 'id' || field === 'year' || field === 'imdb') {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    let comparison = 0;
    if (valueA < valueB) comparison = -1;
    if (valueA > valueB) comparison = 1;

    return direction === 'desc' ? -comparison : comparison;
  });

  // Clear and re-append sorted rows
  rows.forEach((row) => tbody.appendChild(row));

  // Update header indicators
  const headers = table.querySelectorAll('th');
  headers.forEach((th) => {
    th.classList.remove('sorted-asc', 'sorted-desc');
    if (th.dataset.field === field) {
      th.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
  });
}

export function startSortingCycle(table) {
  intervalId = setInterval(() => {
    const { field, direction } = sortStates[currentSortIndex];
    sortByDataAttribute(table, field, direction);

    currentSortIndex = (currentSortIndex + 1) % sortStates.length;
  }, SORT_INTERVAL);

  return intervalId;
}

export function stopSortingCycle() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function initSortingDom(container) {
  const table = generateTable(container);
  startSortingCycle(table);
  return table;
}

export { movies, sortStates, SORT_INTERVAL };
