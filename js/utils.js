// 🎬 CineVerse - Utilities & Helper Functions

// ============ TOAST NOTIFICATIONS ============
class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
    `;

    const container = document.getElementById('toast-container') || createToastContainer();
    container.appendChild(toast);

    setTimeout(() => toast.remove(), duration);
  }

  static success(message) {
    this.show(message, 'success');
  }

  static error(message) {
    this.show(message, 'error');
  }

  static warning(message) {
    this.show(message, 'warning');
  }

  static info(message) {
    this.show(message, 'info');
  }
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  document.body.appendChild(container);
  return container;
}

// Add toast styles
const toastStyles = `
  .toast {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(20, 20, 20, 0.95);
    color: #f5f5f5;
    padding: 15px 20px;
    border-radius: 8px;
    border: 1px solid rgba(229, 9, 20, 0.3);
    backdrop-filter: blur(10px);
    animation: slideInRight 0.3s ease;
    min-width: 300px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .toast-success {
    border-color: #4caf50;
  }

  .toast-success i {
    color: #4caf50;
  }

  .toast-error {
    border-color: #f44336;
  }

  .toast-error i {
    color: #f44336;
  }

  .toast-warning {
    border-color: #ff9800;
  }

  .toast-warning i {
    color: #ff9800;
  }

  .toast-info {
    border-color: #e50914;
  }

  .toast-info i {
    color: #e50914;
  }

  .toast button {
    margin-left: auto;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// ============ LOCAL STORAGE MANAGER ============
class StorageManager {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  // Watchlist
  static addToWatchlist(movie) {
    const watchlist = this.get('watchlist') || [];
    if (!watchlist.find(m => m.id === movie.id)) {
      watchlist.push(movie);
      this.set('watchlist', watchlist);
      Toast.success(`${movie.title} added to watchlist`);
      return true;
    }
    Toast.warning('Already in watchlist');
    return false;
  }

  static removeFromWatchlist(movieId) {
    const watchlist = this.get('watchlist') || [];
    const filtered = watchlist.filter(m => m.id !== movieId);
    this.set('watchlist', filtered);
    Toast.info('Removed from watchlist');
  }

  static getWatchlist() {
    return this.get('watchlist') || [];
  }

  // Watch history
  static addToHistory(movie) {
    const history = this.get('history') || [];
    history.unshift({
      ...movie,
      watchedAt: new Date().toISOString()
    });
    // Keep only last 50 items
    if (history.length > 50) history.pop();
    this.set('history', history);
  }

  static getHistory() {
    return this.get('history') || [];
  }
}

// ============ LAZY LOADING ============
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('[data-lazy]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      this.images.forEach(img => observer.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => this.loadImage(img));
    }
  }

  loadImage(img) {
    const src = img.dataset.lazy;
    if (src) {
      img.src = src;
      img.removeAttribute('data-lazy');
    }
  }
}

// ============ SCROLL ANIMATIONS ============
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animation = entry.target.dataset.animate;
            entry.target.classList.add(animation);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      this.elements.forEach(el => observer.observe(el));
    }
  }
}

// ============ THROTTLE & DEBOUNCE ============
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

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

// ============ TIME FORMATTER ============
function formatTime(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// ============ ANIMATION FRAME UTILITIES ============
function requestAnimationFramePolyfill() {
  if (typeof requestAnimationFrame === 'undefined') {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 1000 / 60);
    };
  }
}

// ============ INTERSECTION OBSERVER FOR COUNTING ============
function countUp(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ============ EVENT EMITTER ============
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }
}

// ============ FETCH WITH TIMEOUT ============
async function fetchWithTimeout(url, timeout = 5000, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// ============ URL UTILITIES ============
function getQueryParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

function setQueryParam(param, value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
}

// ============ COPY TO CLIPBOARD ============
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    Toast.success('Copied to clipboard');
    return true;
  } catch (err) {
    Toast.error('Failed to copy');
    return false;
  }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFramePolyfill();
  new LazyLoader();
  new ScrollAnimations();

  // Add toast styles
  const style = document.createElement('style');
  style.textContent = toastStyles;
  document.head.appendChild(style);
});

// Export for use
window.Toast = Toast;
window.StorageManager = StorageManager;
window.LazyLoader = LazyLoader;
window.ScrollAnimations = ScrollAnimations;
