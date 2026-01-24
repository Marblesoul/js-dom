const moviesData = [
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

export function sortMovies(movies, field, direction) {
  return [...movies].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    let comparison = 0;
    if (valueA < valueB) comparison = -1;
    if (valueA > valueB) comparison = 1;

    return direction === 'desc' ? -comparison : comparison;
  });
}

export function renderTable(container, movies, sortField = null, sortDirection = null) {
  // Clear container
  container.innerHTML = '';

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

    if (header === sortField) {
      th.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }

    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);

  // Create body with data-* attributes (same format as data-attributes version)
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

    tbody.append(tr);
  });

  table.append(tbody);
  container.append(table);

  return table;
}

export function startSortingCycle(container, movies) {
  // Initial render without sorting
  renderTable(container, movies);

  intervalId = setInterval(() => {
    const { field, direction } = sortStates[currentSortIndex];
    const sortedMovies = sortMovies(movies, field, direction);
    renderTable(container, sortedMovies, field, direction);

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

export function initSortingMemory(container) {
  startSortingCycle(container, moviesData);
}

export { moviesData, sortStates, SORT_INTERVAL };
