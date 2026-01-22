<script>
/**
 * QURIO THEME SWITCHER
 * Version: 2.1.0
 *
 * Dynamic theme system for Qurio luxury real estate CRM
 * Built on HighLevel white-label platform
 *
 * Includes Usertour.js integration for product tours
 *
 * Available Themes:
 * - light: Luxury Light (Navy & Gold)
 * - dark: Luxury Dark (Full Dark with Gold)
 * - minimalist: Modern Minimalist (Charcoal & Copper)
 * - champagne: Champagne & Noir (Parisian Elegance)
 * - emerald: Emerald Estate (British Luxury)
 * - coastal: Coastal Luxury (Hampton/Tiffany)
 * - modern-tech: Modern Tech (Clean SaaS with Teal)
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    // Usertour.js Configuration
    usertour: {
      enabled: true,
      token: 'cmkp6w8g20atlxqpezuef2btb'
    },
    themes: {
      none: {
        name: 'No Theme',
        description: 'Default HighLevel appearance',
        icon: '🚫',
        colors: {
          sidebar: '#374151',
          accent: '#6b7280'
        }
      },
      light: {
        name: 'Luxury Light',
        description: 'Classic navy and gold luxury theme',
        icon: '☀️',
        colors: {
          sidebar: '#1a2332',
          accent: '#c9a961'
        }
      },
      dark: {
        name: 'Luxury Dark',
        description: 'Full dark mode with gold accents',
        icon: '🌙',
        colors: {
          sidebar: '#1a2332',
          accent: '#c9a961'
        }
      },
      minimalist: {
        name: 'Modern Minimalist',
        description: 'Charcoal and copper refined elegance',
        icon: '◼️',
        colors: {
          sidebar: '#2d2d2d',
          accent: '#b87333'
        }
      },
      champagne: {
        name: 'Champagne & Noir',
        description: 'Parisian elegance with rose gold',
        icon: '🥂',
        colors: {
          sidebar: '#1a1a1a',
          accent: '#b76e79'
        }
      },
      emerald: {
        name: 'Emerald Estate',
        description: 'British luxury with rich gold',
        icon: '💎',
        colors: {
          sidebar: '#1b4332',
          accent: '#d4af37'
        }
      },
      coastal: {
        name: 'Coastal Luxury',
        description: 'Hampton elegance with teal accents',
        icon: '🌊',
        colors: {
          sidebar: '#0a7b7b',
          accent: '#ffffff'
        }
      },
      'modern-tech': {
        name: 'Modern Tech',
        description: 'Clean SaaS style with light sidebar',
        icon: '💻',
        colors: {
          sidebar: '#1a1f36',
          accent: '#14b8a6'
        }
      }
    },
    defaultTheme: 'light',
    storageKey: 'qurio-theme-preference',
    showSwitcher: true,
    position: 'bottom-right', // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    debug: false
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Log to console if debug mode is enabled
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Qurio Themes]', ...args);
    }
  }

  /**
   * Get current theme from localStorage
   */
  function getCurrentTheme() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKey);
      if (stored && CONFIG.themes[stored]) {
        log('Retrieved theme from storage:', stored);
        return stored;
      }
    } catch (e) {
      log('Could not access localStorage:', e);
    }
    log('Using default theme:', CONFIG.defaultTheme);
    return CONFIG.defaultTheme;
  }

  /**
   * Save theme preference to localStorage
   */
  function saveTheme(themeName) {
    try {
      localStorage.setItem(CONFIG.storageKey, themeName);
      log('Saved theme to storage:', themeName);
      return true;
    } catch (e) {
      log('Could not save theme to localStorage:', e);
      return false;
    }
  }

  // ============================================
  // USERTOUR.JS INTEGRATION
  // ============================================

  /**
   * Extract LocationID from the current URL
   * HighLevel URLs typically follow: /location/{locationId}/...
   */
  function getLocationId() {
    const match = window.location.pathname.match(/location\/([^\/]+)/);
    return match ? match[1] : null;
  }

  /**
   * Load Usertour.js script from CDN
   */
  function loadUsertourScript() {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.usertour && typeof window.usertour.init === 'function') {
        resolve(window.usertour);
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://js.usertour.io/legacy/usertour.iife.js';

      script.onload = () => {
        log('Usertour.js script loaded');
        resolve(window.usertour);
      };

      script.onerror = () => {
        log('Failed to load Usertour.js script');
        reject(new Error('Failed to load Usertour.js'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Initialize Usertour with user identification
   */
  async function initUsertour() {
    if (!CONFIG.usertour.enabled) {
      log('Usertour is disabled in config');
      return;
    }

    try {
      // Load the Usertour script
      await loadUsertourScript();

      // Initialize with environment token
      window.usertour.init(CONFIG.usertour.token);
      log('Usertour initialized with token');

      // Get LocationID for user identification
      const locationId = getLocationId();

      if (locationId) {
        // Identify by LocationID
        window.usertour.identify(locationId, {
          location_id: locationId,
          theme: getCurrentTheme(),
          identified_at: new Date().toISOString()
        });
        log('Usertour identified user by LocationID:', locationId);
      } else {
        // Anonymous identification fallback
        window.usertour.identifyAnonymous({
          theme: getCurrentTheme(),
          identified_at: new Date().toISOString()
        });
        log('Usertour using anonymous identification');
      }

    } catch (error) {
      log('Usertour initialization error:', error);
    }
  }

  // ============================================
  // THEME APPLICATION
  // ============================================

  /**
   * Apply theme to the document
   */
  function applyTheme(themeName, savePreference = true) {
    // Validate theme name
    if (!CONFIG.themes[themeName]) {
      log('Invalid theme name:', themeName);
      return false;
    }

    const html = document.documentElement;

    // Apply new theme (light is default, so no attribute needed)
    if (themeName !== 'light') {
      html.setAttribute('data-ql-theme', themeName);
    } else {
      html.removeAttribute('data-ql-theme');
    }

    // Save preference if requested
    if (savePreference) {
      saveTheme(themeName);
    }

    // Dispatch custom event for any listeners
    const event = new CustomEvent('ql-theme-changed', {
      detail: {
        theme: themeName,
        themeData: CONFIG.themes[themeName]
      }
    });
    window.dispatchEvent(event);

    // Update Usertour with theme change (if available)
    if (window.usertour && savePreference) {
      try {
        window.usertour.identify(null, {
          theme: themeName,
          theme_changed_at: new Date().toISOString()
        });
        log('Usertour updated with theme:', themeName);
      } catch (e) {
        log('Could not update Usertour:', e);
      }
    }

    log('Applied theme:', themeName);
    return true;
  }

  // ============================================
  // THEME SWITCHER UI
  // ============================================

  /**
   * Get position styles based on configuration
   */
  function getPositionStyles() {
    const positions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;'
    };
    return positions[CONFIG.position] || positions['bottom-right'];
  }

  /**
   * Create theme switcher UI element
   */
  function createThemeSwitcher() {
    // Check if switcher already exists
    if (document.getElementById('ql-theme-switcher')) {
      log('Theme switcher already exists');
      return;
    }

    // Don't create if disabled in config
    if (!CONFIG.showSwitcher) {
      log('Theme switcher disabled in config');
      return;
    }

    const container = document.createElement('div');
    container.id = 'ql-theme-switcher';

    // Build HTML for theme buttons
    let buttonsHTML = '';
    Object.keys(CONFIG.themes).forEach(themeKey => {
      const theme = CONFIG.themes[themeKey];
      buttonsHTML += `
        <button
          class="ql-theme-btn"
          data-theme="${themeKey}"
          title="${theme.name}: ${theme.description}"
          aria-label="Switch to ${theme.name}"
          style="--btn-sidebar-color: ${theme.colors.sidebar}; --btn-accent-color: ${theme.colors.accent};"
        >
          <span class="ql-theme-icon">${theme.icon}</span>
        </button>
      `;
    });

    container.innerHTML = `
      <style>
        #ql-theme-switcher {
          position: fixed;
          ${getPositionStyles()}
          z-index: 99999;
          background: var(--ql-surface-elevated, #ffffff);
          border: 1px solid var(--ql-border, #e9ecef);
          border-radius: var(--ql-radius-lg, 12px);
          box-shadow: var(--ql-shadow-lg, 0 10px 15px rgba(0,0,0,0.1));
          padding: 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 6px;
          max-width: 180px;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        #ql-theme-switcher:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.15);
        }

        .ql-theme-btn {
          width: 48px;
          height: 48px;
          border: 2px solid var(--ql-border, #e9ecef);
          border-radius: var(--ql-radius, 8px);
          background: linear-gradient(135deg, var(--btn-sidebar-color) 50%, var(--btn-accent-color) 50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
          padding: 0;
          outline: none;
        }

        .ql-theme-icon {
          font-size: 18px;
          line-height: 1;
          display: block;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }

        .ql-theme-btn:hover {
          border-color: var(--ql-primary, #1a2332);
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .ql-theme-btn:active {
          transform: scale(0.95);
        }

        .ql-theme-btn.active {
          border-color: var(--ql-primary, #1a2332);
          border-width: 3px;
          box-shadow: 0 0 0 2px var(--ql-accent, #c9a961);
        }

        /* Tooltip */
        .ql-theme-btn::before {
          content: attr(title);
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--ql-primary, #1a2332);
          color: white;
          padding: 8px 12px;
          border-radius: var(--ql-radius-sm, 4px);
          font-size: 11px;
          font-family: var(--ql-font-body, sans-serif);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 1;
          max-width: 200px;
          white-space: normal;
          text-align: center;
          line-height: 1.3;
        }

        .ql-theme-btn::after {
          content: '';
          position: absolute;
          bottom: calc(100% + 2px);
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--ql-primary, #1a2332);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .ql-theme-btn:hover::before,
        .ql-theme-btn:hover::after {
          opacity: 1;
        }

        .ql-theme-btn:hover::before {
          transform: translateX(-50%) translateY(-4px);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          #ql-theme-switcher {
            padding: 8px;
            gap: 4px;
            max-width: 150px;
          }

          .ql-theme-btn {
            width: 40px;
            height: 40px;
          }

          .ql-theme-icon {
            font-size: 16px;
          }

          /* Hide tooltips on mobile */
          .ql-theme-btn::before,
          .ql-theme-btn::after {
            display: none;
          }
        }

        /* Animation for initial load */
        @keyframes ql-switcher-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        #ql-theme-switcher {
          animation: ql-switcher-enter 0.5s ease;
        }

        /* Collapsed state toggle */
        #ql-theme-switcher .ql-collapse-toggle {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--ql-primary, #1a2332);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        #ql-theme-switcher .ql-collapse-toggle:hover {
          transform: scale(1.1);
        }

        #ql-theme-switcher.collapsed {
          max-width: 60px;
          padding: 8px;
        }

        #ql-theme-switcher.collapsed .ql-theme-btn:not(.active) {
          display: none;
        }

        #ql-theme-switcher.collapsed .ql-collapse-toggle {
          transform: rotate(180deg);
        }
      </style>

      <button class="ql-collapse-toggle" title="Toggle theme picker" aria-label="Toggle theme picker">
        ◀
      </button>
      <div class="ql-theme-buttons">
        ${buttonsHTML}
      </div>
    `;

    // Add to page
    document.body.appendChild(container);

    // Attach event listeners for theme buttons
    container.querySelectorAll('.ql-theme-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        applyTheme(theme);
        updateSwitcherState(theme);
      });
    });

    // Attach event listener for collapse toggle
    const collapseToggle = container.querySelector('.ql-collapse-toggle');
    if (collapseToggle) {
      collapseToggle.addEventListener('click', function() {
        container.classList.toggle('collapsed');
      });
    }

    // Set initial active state
    updateSwitcherState(getCurrentTheme());

    log('Theme switcher UI created');
  }

  /**
   * Update active state of theme buttons
   */
  function updateSwitcherState(activeTheme) {
    const switcher = document.getElementById('ql-theme-switcher');
    if (!switcher) return;

    switcher.querySelectorAll('.ql-theme-btn').forEach(btn => {
      const theme = btn.getAttribute('data-theme');
      if (theme === activeTheme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    log('Updated switcher state:', activeTheme);
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Initialize the theme system
   */
  function init() {
    log('Initializing Qurio Theme System v2.0...');

    // Apply saved theme immediately (before DOM loads)
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme, false);

    // Create UI and initialize Usertour when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        createThemeSwitcher();
        initUsertour();
      });
    } else {
      // DOM already loaded
      createThemeSwitcher();
      initUsertour();
    }

    log('Qurio Theme System initialized with theme:', currentTheme);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  /**
   * Public API exposed on window object
   */
  window.QurioThemes = {
    // Methods
    apply: applyTheme,
    get current() {
      return getCurrentTheme();
    },

    // Data
    themes: CONFIG.themes,
    config: CONFIG,

    // Version
    version: '2.1.0',

    // Manual UI creation (if auto-creation is disabled)
    createSwitcher: createThemeSwitcher,

    // Event listener helper
    onChange: function(callback) {
      window.addEventListener('ql-theme-changed', function(e) {
        callback(e.detail.theme, e.detail.themeData);
      });
    },

    // Get list of available theme names
    list: function() {
      return Object.keys(CONFIG.themes);
    },

    // Cycle to next theme
    next: function() {
      const themes = Object.keys(CONFIG.themes);
      const currentIndex = themes.indexOf(getCurrentTheme());
      const nextIndex = (currentIndex + 1) % themes.length;
      applyTheme(themes[nextIndex]);
      updateSwitcherState(themes[nextIndex]);
      return themes[nextIndex];
    },

    // Cycle to previous theme
    prev: function() {
      const themes = Object.keys(CONFIG.themes);
      const currentIndex = themes.indexOf(getCurrentTheme());
      const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
      applyTheme(themes[prevIndex]);
      updateSwitcherState(themes[prevIndex]);
      return themes[prevIndex];
    }
  };

  // ============================================
  // AUTO-INITIALIZE
  // ============================================

  init();

})();

/**
 * Usage Examples:
 *
 * // Apply a theme programmatically
 * QurioThemes.apply('emerald');
 * QurioThemes.apply('champagne');
 * QurioThemes.apply('coastal');
 * QurioThemes.apply('modern-tech');
 *
 * // Get current theme
 * console.log(QurioThemes.current);
 *
 * // Listen for theme changes
 * QurioThemes.onChange((theme, data) => {
 *   console.log('Theme changed to:', theme, data);
 * });
 *
 * // Get available themes
 * console.log(QurioThemes.list());
 * // Output: ['none', 'light', 'dark', 'minimalist', 'champagne', 'emerald', 'coastal', 'modern-tech']
 *
 * // Cycle through themes
 * QurioThemes.next(); // Go to next theme
 * QurioThemes.prev(); // Go to previous theme
 *
 * // Get all theme data
 * console.log(QurioThemes.themes);
 *
 * // ============================================
 * // USERTOUR.JS INTEGRATION
 * // ============================================
 *
 * // Usertour is automatically initialized after themes load.
 * // Users are identified by LocationID (extracted from URL).
 * // If no LocationID is found, anonymous identification is used.
 *
 * // Access Usertour directly (after initialization):
 * window.usertour.track('event_name');
 * window.usertour.identify('user_id', { custom_attribute: 'value' });
 *
 * // Usertour automatically tracks:
 * // - location_id: The HighLevel location ID
 * // - theme: The currently selected theme
 * // - theme_changed_at: Timestamp when theme was last changed
 */
</script>