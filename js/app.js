// 🎬 CineVerse - Main Application

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupNavbar();
  setupHeroSection();
});

// App initialization
function initializeApp() {
  console.log('🎬 CineVerse initialized!');
  
  // Remove loader after 2 seconds
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, 2000);
}

// ============ NAVBAR FUNCTIONALITY ============
function setupNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Search functionality in navbar is handled by search.js
  const profileIcon = document.querySelector('.profile-icon');
  if (profileIcon) {
    profileIcon.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(229, 9, 20, 0.5)';
    } else {
      nav.style.borderBottomColor = 'rgba(229, 9, 20, 0.2)';
    }
  });
}

// ============ HERO SECTION FUNCTIONALITY ============
function setupHeroSection() {
  const hero = document.querySelector('.hero');
  const watchBtn = document.querySelector('.btn-primary');
  const trailerBtn = document.querySelector('.btn-secondary');
  const heroMovieId = hero?.dataset.featuredId || getFeaturedMovie()?.id;

  if (hero && heroMovieId) {
    hero.dataset.featuredId = heroMovieId;
  }

  if (watchBtn) {
    watchBtn.addEventListener('click', () => {
      const movie = moviesData.find(m => m.id == heroMovieId);
      if (movie) {
        openTrailer(movie);
      }
    });
  }

  if (trailerBtn) {
    trailerBtn.addEventListener('click', () => {
      const movie = moviesData.find(m => m.id == heroMovieId);
      if (movie) {
        openTrailer(movie);
      }
    });
  }

  autoChangeHero();
}

// Auto-change hero every 8 seconds
let currentMovieIndex = 0;
function autoChangeHero() {
  setInterval(() => {
    const featuredMovies = moviesData.filter(m => m.featured);
    currentMovieIndex = (currentMovieIndex + 1) % featuredMovies.length;
    
    const movie = featuredMovies[currentMovieIndex];
    updateHeroSection(movie);
  }, 8000);
}

// Update hero section with new movie
function updateHeroSection(movie) {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {
    hero.style.backgroundImage = `url('${movie.backdrop}')`;
    hero.dataset.featuredId = movie.id;

    heroContent.innerHTML = `
      <h1>${movie.title}</h1>
      <p>${movie.description}</p>
      <div class="rating">
        <i class="fas fa-star"></i>
        <span>${movie.rating}/10</span>
        <span>${movie.genre}</span>
        <span>${movie.year}</span>
      </div>
      <div class="hero-buttons">
        <button class="btn btn-primary">
          <i class="fas fa-play"></i>
          Watch Now
        </button>
        <button class="btn btn-secondary">
          <i class="fas fa-film"></i>
          Trailer
        </button>
      </div>
    `;

    heroContent.style.animation = 'slideInLeft 0.8s ease forwards';
    setupHeroSection();
  }
}

// ============ UTILITIES ============
function showNotification(message, type = 'success', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'warning') icon = '⚠';
  if (type === 'info') icon = 'ℹ';
  
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('removing');
    setTimeout(() => notification.remove(), 400);
  }, duration);
  
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// Smooth scroll helper
function smoothScroll(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format rating
function formatRating(rating) {
  return parseFloat(rating).toFixed(1);
}

// Get featured movie
function getFeaturedMovie() {
  return moviesData.find(m => m.featured) || moviesData[0];
}

// ============ BACK TO TOP BUTTON ============
function initBackToTop() {
  const backToTop = document.querySelector('#backToTop');
  
  if (!backToTop) {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.title = 'Back to Top';
    document.body.appendChild(button);
  }
  
  const btn = document.querySelector('#backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-on-scroll, .stagger-item, .movie-card, .category-card').forEach(element => {
    element.classList.add('fade-in-on-scroll');
    observer.observe(element);
  });
}

// ============ FAVORITE FUNCTIONALITY ============
function initFavorites() {
  // Load favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('cineverseFavorites') || '[]');
  
  // Add favorite button to movie cards
  document.querySelectorAll('.movie-card').forEach(card => {
    const movieId = card.dataset.id;
    let favoriteBtn = card.querySelector('.favorite-btn');
    
    if (!favoriteBtn) {
      favoriteBtn = document.createElement('button');
      favoriteBtn.className = 'favorite-btn';
      favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
      favoriteBtn.dataset.movieId = movieId;
      
      if (favorites.includes(movieId)) {
        favoriteBtn.classList.add('liked');
      }
      
      card.appendChild(favoriteBtn);
      
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(movieId, favoriteBtn);
      });
    }
  });
}

function toggleFavorite(movieId, button) {
  const favorites = JSON.parse(localStorage.getItem('cineverseFavorites') || '[]');
  const index = favorites.indexOf(movieId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    button.classList.remove('liked');
    showNotification('Removed from favorites', 'info');
  } else {
    favorites.push(movieId);
    button.classList.add('liked');
    showNotification('Added to favorites ❤️', 'success');
  }
  
  localStorage.setItem('cineverseFavorites', JSON.stringify(favorites));
}

// ============ ACTIVE NAVBAR LINKS ============
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--accent-red)';
    }
  });
}

// ============ TRAILER MODAL FUNCTIONALITY ============
function initTrailerModal() {
  const modal = document.querySelector('#trailer-modal');
  if (!modal) return;
  
  // Add event listeners to play buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-secondary') || e.target.closest('.play-btn')) {
      const button = e.target.closest('.btn-secondary') || e.target.closest('.play-btn');
      const card = button.closest('.movie-card');
      
      if (card) {
        const movieId = card.dataset.id;
        const movie = [...moviesData].find(m => m.id == movieId);
        
        if (movie) {
          openTrailer(movie);
        }
      }
    }
  });
  
  // Close modal when close button is clicked
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTrailer);
  }
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeTrailer();
    }
  });
}

function openTrailer(movie) {
  const modal = document.querySelector('#trailer-modal');
  const title = modal.querySelector('#modal-title');
  const video = modal.querySelector('#trailer-video');
  
  if (title) title.textContent = `${movie.title} - Trailer`;
  
  // Use a sample trailer URL - in real app, you'd fetch from TMDB API
  const trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
  if (video) {
    video.src = trailerUrl;
    video.style.display = 'block';
  }
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  showNotification('Playing trailer...', 'info', 2000);
}

function closeTrailer() {
  const modal = document.querySelector('#trailer-modal');
  const video = modal.querySelector('#trailer-video');
  
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
  
  if (video) {
    video.src = '';
    video.style.display = 'none';
  }
}

// ============ INITIALIZATION ON PAGE LOAD ============
document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initScrollAnimations();
  initFavorites();
  initActiveNavLinks();
  initTrailerModal();
});

// Log app version
console.log('%c🎬 CineVerse v1.0 - Enhanced', 'color: #e50914; font-size: 20px; font-weight: bold;');
