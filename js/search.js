// 🎬 CineVerse - Search Functionality

class MovieSearch {
  constructor() {
    this.allMovies = [...moviesData, ...seriesData];
    this.searchInput = document.querySelector('.search-box input');
    this.resultsContainer = null;
    this.initialize();
  }

  initialize() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
      this.searchInput.addEventListener('focus', () => this.showResults());
      this.searchInput.addEventListener('blur', () => setTimeout(() => this.hideResults(), 200));

      document.addEventListener('click', (e) => {
        if (!this.resultsContainer) return;
        if (e.target.closest('.search-box')) return;
        if (!this.resultsContainer.contains(e.target)) {
          this.hideResults();
        }
      });
    }
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();

    if (query.length === 0) {
      this.hideResults();
      return;
    }

    const results = this.searchMovies(query);
    this.displayResults(results);
  }

  searchMovies(query) {
    return this.allMovies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
      );
    });
  }

  displayResults(results) {
    if (!this.resultsContainer) {
      this.createResultsContainer();
    }

    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-search"></i>
          <p>No movies found</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(movie => `
      <a href="#" class="search-result-item" data-id="${movie.id}">
        <img src="${movie.image}" alt="${movie.title}" class="search-result-image">
        <div class="search-result-info">
          <h4>${movie.title}</h4>
          <span>${movie.genre}</span>
          <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
        </div>
      </a>
    `).join('');

    this.resultsContainer.innerHTML = resultsHTML;
    this.resultsContainer.style.display = 'block';
  }

  createResultsContainer() {
    this.resultsContainer = document.createElement('div');
    this.resultsContainer.className = 'search-results';
    document.querySelector('.search-box').appendChild(this.resultsContainer);
    this.addResultClickListeners();
  }

  addResultClickListeners() {
    this.resultsContainer.addEventListener('click', (e) => {
      const resultItem = e.target.closest('.search-result-item');
      if (!resultItem) return;
      e.preventDefault();

      const movieId = resultItem.dataset.id;
      const movie = this.allMovies.find(item => item.id == movieId);
      if (movie && typeof openTrailer === 'function') {
        openTrailer(movie);
      }
      this.hideResults();
    });
  }

  showResults() {
    if (this.resultsContainer && this.resultsContainer.innerHTML) {
      this.resultsContainer.style.display = 'block';
    }
  }

  hideResults() {
    if (this.resultsContainer) {
      this.resultsContainer.style.display = 'none';
    }
  }
}

// Initialize search when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MovieSearch();
  });
} else {
  new MovieSearch();
}

// Filter movies by genre
function filterByGenre(genre) {
  return moviesData.filter(movie => movie.genre === genre);
}

// Filter movies by rating
function filterByRating(minRating) {
  return moviesData.filter(movie => parseFloat(movie.rating) >= minRating);
}

// Filter movies by year
function filterByYear(year) {
  return moviesData.filter(movie => movie.year === year);
}

// Search with advanced options
function advancedSearch(options) {
  let results = [...moviesData];

  if (options.title) {
    results = results.filter(m => m.title.toLowerCase().includes(options.title.toLowerCase()));
  }

  if (options.genre) {
    results = results.filter(m => m.genre === options.genre);
  }

  if (options.minRating) {
    results = results.filter(m => parseFloat(m.rating) >= options.minRating);
  }

  if (options.year) {
    results = results.filter(m => m.year === options.year);
  }

  return results;
}
