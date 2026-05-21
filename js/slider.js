// 🎬 CineVerse - Slider/Carousel Functionality

class MovieSlider {
  constructor(containerId, movies, itemsPerView = 5) {
    this.container = document.getElementById(containerId);
    this.movies = movies;
    this.itemsPerView = itemsPerView;
    this.currentIndex = 0;
    this.initialize();
  }

  initialize() {
    if (!this.container) return;
    this.renderSlider();
    this.setupControls();
  }

  renderSlider() {
    const slidesHTML = this.movies.map((movie, index) => `
      <div class="slide" data-index="${index}">
        <div class="movie-card">
          <img src="${movie.image}" alt="${movie.title}" class="movie-image">
          <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
              <span class="movie-rating">
                <i class="fas fa-star"></i>
                ${movie.rating}
              </span>
              <span>${movie.genre}</span>
            </div>
          </div>
          <div class="movie-overlay">
            <button class="play-btn" onclick="playMovie(${movie.id})">
              <i class="fas fa-play"></i>
            </button>
            <div class="movie-overlay-info">
              <h3>${movie.title}</h3>
              <p>${movie.genre}</p>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="slider-wrapper">
        <div class="slides-container">
          ${slidesHTML}
        </div>
        <button class="slider-btn prev-btn">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="slider-btn next-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  setupControls() {
    const prevBtn = this.container.querySelector('.prev-btn');
    const nextBtn = this.container.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch support
    this.setupTouchSupport();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.movies.length;
    this.updateSlider();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
    this.updateSlider();
  }

  updateSlider() {
    const container = this.container.querySelector('.slides-container');
    if (container) {
      const offset = -this.currentIndex * (100 / this.itemsPerView);
      container.style.transform = `translateX(${offset}%)`;
    }
  }

  setupTouchSupport() {
    let startX = 0;
    const container = this.container.querySelector('.slides-container');

    if (!container) return;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) this.next();
      if (diff < -50) this.prev();
    });
  }
}

// Helper function to play movie
function playMovie(movieId) {
  const movie = moviesData.find(m => m.id === movieId);
  if (movie) {
    if (typeof openTrailer === 'function') {
      openTrailer(movie);
    } else {
      console.log('Playing:', movie.title);
      showNotification(`Now playing: ${movie.title}`);
    }
  }
}

// Auto-rotating slider
class AutoSlider extends MovieSlider {
  constructor(containerId, movies, itemsPerView = 5, autoplayInterval = 5000) {
    super(containerId, movies, itemsPerView);
    this.autoplayInterval = autoplayInterval;
    this.startAutoplay();
  }

  startAutoplay() {
    this.interval = setInterval(() => this.next(), this.autoplayInterval);
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

// Initialize default sliders when DOM is loaded
function initializeDefaultSliders() {
  // Trending slider
  const trendingContainer = document.getElementById('trending-container');
  if (trendingContainer) {
    const trendingMovies = moviesData.filter(m => m.featured);
    new AutoSlider('trending-container', trendingMovies, 5, 5000);
  }

  // Continue watching slider
  const continueWatchingContainer = document.getElementById('continue-watching');
  if (continueWatchingContainer) {
    const randomMovies = [...moviesData].sort(() => 0.5 - Math.random()).slice(0, 8);
    new AutoSlider('continue-watching', randomMovies, 5, 6000);
  }
}

// Note: slider initialization is handled explicitly where needed.
