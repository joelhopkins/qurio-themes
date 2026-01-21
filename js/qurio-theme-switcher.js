/**
 * QURIO THEME SWITCHER
 * Version: 1.0.0
 * 
 * Dynamic theme system for Qurio luxury real estate CRM
 * Built on HighLevel white-label platform
 */

(function() {
  'use strict';
  
  // ============================================
  // CONFIGURATION
  // ============================================
  
  const CONFIG = {
    themes: {
      light: {
        name: 'Luxury Light',
        description: 'Classic navy and gold luxury theme',
        icon: '☀️'
      },
      dark: {
        name: 'Luxury Dark',
        description: 'Sophisticated dark mode with gold accents',
        icon: '🌙'
      },
      minimalist: {
        name: 'Modern Minimalist',
        description: 'Clean black and white with red accents',
        icon: '⚡'
      }
    },
    defaultTheme: 'light',
    storageKey: 'qurio-theme-preference',
    showSwitcher: true, // Set to false to hide the theme switcher UI
    position: 'bottom-right', // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    debug: false // Set to true for console logging
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
    
    // Remove all theme attributes
    Object.keys(CONFIG.themes).forEach(theme => {
      html.removeAttribute(`data-ql-theme-${theme}`);
    });
    
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
          title="${theme.name}"
          aria-label="Switch to ${theme.name}"
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
          padding: 8px;
          display: flex;
          flex-direction: row;
          gap: 6px;
          transition: all 0.3s ease;
          opacity: 0.9;
        }
        
        #ql-theme-switcher:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.15);
        }
        
        .ql-theme-btn {
          width: 44px;
          height: 44px;
          border: 2px solid var(--ql-border, #e9ecef);
          border-radius: var(--ql-radius, 8px);
          background: var(--ql-background, #ffffff);
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
          font-size: 20px;
          line-height: 1;
          display: block;
        }
        
        .ql-theme-btn:hover {
          border-color: var(--ql-primary, #1a2332);
          transform: scale(1.05);
          box-shadow: var(--ql-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
        }
        
        .ql-theme-btn:active {
          transform: scale(0.95);
        }
        
        .ql-theme-btn.active {
          background: var(--ql-primary, #1a2332);
          border-color: var(--ql-primary, #1a2332);
          color: white;
        }
        
        .ql-theme-btn.active .ql-theme-icon {
          filter: brightness(0) invert(1);
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
          padding: 6px 12px;
          border-radius: var(--ql-radius-sm, 4px);
          font-size: 12px;
          font-family: var(--ql-font-body, sans-serif);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 1;
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
            padding: 6px;
            gap: 4px;
          }
          
          .ql-theme-btn {
            width: 38px;
            height: 38px;
          }
          
          .ql-theme-icon {
            font-size: 18px;
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
      </style>
      
      <div class="ql-theme-buttons">
        ${buttonsHTML}
      </div>
    `;
    
    // Add to page
    document.body.appendChild(container);
    
    // Attach event listeners
    container.querySelectorAll('.ql-theme-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        applyTheme(theme);
        updateSwitcherState(theme);
      });
    });
    
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
    log('Initializing Qurio Theme System...');
    
    // Apply saved theme immediately (before DOM loads)
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme, false);
    
    // Create UI when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createThemeSwitcher);
    } else {
      // DOM already loaded
      createThemeSwitcher();
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
    version: '1.0.0',
    
    // Manual UI creation (if auto-creation is disabled)
    createSwitcher: createThemeSwitcher,
    
    // Event listener helper
    onChange: function(callback) {
      window.addEventListener('ql-theme-changed', function(e) {
        callback(e.detail.theme, e.detail.themeData);
      });
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
 * QurioThemes.apply('dark');
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
 * console.log(QurioThemes.themes);
 */