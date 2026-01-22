<script>
/**
 * QURIO SETTINGS PANEL
 * Version: 3.0.1
 *
 * Dynamic settings system for Qurio luxury real estate CRM
 * Built on HighLevel white-label platform
 *
 * Features:
 * - Settings panel with gear icon trigger
 * - Theme selection (7 luxury themes + default)
 * - Menu visibility toggles (hide/show sidebar items)
 * - localStorage for all preferences
 * - Usertour.js integration for product tours
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

    // Theme Configuration
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

    // Menu Items Configuration
    // Selectors based on actual HighLevel sidebar HTML structure
    menuItems: {
      launchpad: { name: 'Launchpad', selector: '#sb_launchpad', default: true },
      dashboard: { name: 'Dashboard', selector: '#sb_dashboard', default: true },
      conversations: { name: 'Conversations', selector: '#sb_conversations', default: true },
      calendars: { name: 'Calendars', selector: '#sb_calendars', default: true },
      contacts: { name: 'Contacts', selector: '#sb_contacts', default: true },
      opportunities: { name: 'Opportunities', selector: '#sb_opportunities', default: true },
      payments: { name: 'Payments', selector: '#sb_payments', default: true },
      aiAgents: { name: 'AI Agents', selector: 'a[meta="AI Agents"]', default: true },
      marketing: { name: 'Marketing', selector: '#sb_email-marketing', default: true },
      automation: { name: 'Automation', selector: '#sb_automation', default: true },
      sites: { name: 'Sites', selector: '#sb_sites', default: true },
      memberships: { name: 'Memberships', selector: '#sb_memberships', default: true },
      mediaStorage: { name: 'Media Storage', selector: '#sb_app-media', default: true },
      reputation: { name: 'Reputation', selector: '#sb_reputation', default: true },
      reporting: { name: 'Reporting', selector: '#sb_reporting', default: true },
      appMarketplace: { name: 'App Marketplace', selector: '#sb_app-marketplace', default: true },
      qurioDocs: { name: 'Qurio Docs', selector: 'a.custom-link', default: true }
    },

    // Storage Keys
    storageKeys: {
      theme: 'qurio-theme-preference',
      menuVisibility: 'qurio-menu-visibility'
    },

    // UI Settings
    defaultTheme: 'light',
    showSettings: true,
    position: 'bottom-right',
    debug: false
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Qurio Settings]', ...args);
    }
  }

  // ============================================
  // THEME MANAGEMENT
  // ============================================

  function getCurrentTheme() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKeys.theme);
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

  function saveTheme(themeName) {
    try {
      localStorage.setItem(CONFIG.storageKeys.theme, themeName);
      log('Saved theme to storage:', themeName);
      return true;
    } catch (e) {
      log('Could not save theme to localStorage:', e);
      return false;
    }
  }

  function applyTheme(themeName, savePreference = true) {
    if (!CONFIG.themes[themeName]) {
      log('Invalid theme name:', themeName);
      return false;
    }

    const html = document.documentElement;

    if (themeName !== 'light') {
      html.setAttribute('data-ql-theme', themeName);
    } else {
      html.removeAttribute('data-ql-theme');
    }

    if (savePreference) {
      saveTheme(themeName);
    }

    const event = new CustomEvent('ql-theme-changed', {
      detail: { theme: themeName, themeData: CONFIG.themes[themeName] }
    });
    window.dispatchEvent(event);

    if (window.usertour && savePreference) {
      try {
        window.usertour.identify(null, {
          theme: themeName,
          theme_changed_at: new Date().toISOString()
        });
      } catch (e) {
        log('Could not update Usertour:', e);
      }
    }

    log('Applied theme:', themeName);
    return true;
  }

  // ============================================
  // MENU VISIBILITY MANAGEMENT
  // ============================================

  function getMenuVisibility() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKeys.menuVisibility);
      if (stored) {
        const parsed = JSON.parse(stored);
        log('Retrieved menu visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access menu visibility from localStorage:', e);
    }

    // Return defaults
    const defaults = {};
    Object.keys(CONFIG.menuItems).forEach(key => {
      defaults[key] = CONFIG.menuItems[key].default;
    });
    log('Using default menu visibility');
    return defaults;
  }

  function saveMenuVisibility(visibility) {
    try {
      localStorage.setItem(CONFIG.storageKeys.menuVisibility, JSON.stringify(visibility));
      log('Saved menu visibility to storage:', visibility);
      return true;
    } catch (e) {
      log('Could not save menu visibility to localStorage:', e);
      return false;
    }
  }

  function applyMenuVisibility(visibility) {
    // Remove existing style element if present
    let styleEl = document.getElementById('qurio-menu-visibility-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'qurio-menu-visibility-styles';
      document.head.appendChild(styleEl);
    }

    // Build CSS rules for hidden items
    // Need high specificity to override theme CSS rules like:
    // html:not([data-ql-theme="none"]) #sidebar-v2 nav a { display: flex !important; }
    let css = '';
    Object.keys(visibility).forEach(key => {
      if (!visibility[key] && CONFIG.menuItems[key]) {
        const item = CONFIG.menuItems[key];
        // High specificity selectors to override theme styles
        css += `html #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
        css += `html:not([data-ql-theme="none"]) #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
        css += `html body #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
      }
    });

    styleEl.textContent = css;
    log('Applied menu visibility CSS:', css);

    // Also apply via direct DOM manipulation as a fallback
    Object.keys(visibility).forEach(key => {
      if (CONFIG.menuItems[key]) {
        const item = CONFIG.menuItems[key];
        try {
          const elements = document.querySelectorAll(item.selector);
          elements.forEach(el => {
            if (visibility[key]) {
              el.style.removeProperty('display');
              el.style.removeProperty('visibility');
            } else {
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
            }
          });
        } catch (e) {
          log('Could not apply visibility to', key, e);
        }
      }
    });
  }

  function setMenuItemVisibility(itemKey, visible) {
    const visibility = getMenuVisibility();
    visibility[itemKey] = visible;
    saveMenuVisibility(visibility);
    applyMenuVisibility(visibility);

    // Update toggle in UI if exists
    const toggle = document.querySelector(`#qurio-settings-panel [data-menu-item="${itemKey}"]`);
    if (toggle) {
      toggle.checked = visible;
    }

    const event = new CustomEvent('ql-menu-visibility-changed', {
      detail: { item: itemKey, visible: visible, visibility: visibility }
    });
    window.dispatchEvent(event);
  }

  // ============================================
  // USERTOUR.JS INTEGRATION
  // ============================================

  function getLocationId() {
    const match = window.location.pathname.match(/location\/([^\/]+)/);
    return match ? match[1] : null;
  }

  function loadUsertourScript() {
    return new Promise((resolve, reject) => {
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

  async function initUsertour() {
    if (!CONFIG.usertour.enabled) {
      log('Usertour is disabled in config');
      return;
    }

    try {
      await loadUsertourScript();
      window.usertour.init(CONFIG.usertour.token);
      log('Usertour initialized with token');

      const locationId = getLocationId();

      if (locationId) {
        window.usertour.identify(locationId, {
          location_id: locationId,
          theme: getCurrentTheme(),
          identified_at: new Date().toISOString()
        });
        log('Usertour identified user by LocationID:', locationId);
      } else {
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
  // SETTINGS PANEL UI
  // ============================================

  function getPositionStyles() {
    const positions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;'
    };
    return positions[CONFIG.position] || positions['bottom-right'];
  }

  function createSettingsPanel() {
    if (document.getElementById('qurio-settings-panel')) {
      log('Settings panel already exists');
      return;
    }

    if (!CONFIG.showSettings) {
      log('Settings panel disabled in config');
      return;
    }

    const currentTheme = getCurrentTheme();
    const menuVisibility = getMenuVisibility();

    // Build theme buttons HTML
    let themeButtonsHTML = '';
    Object.keys(CONFIG.themes).forEach(themeKey => {
      const theme = CONFIG.themes[themeKey];
      const isActive = themeKey === currentTheme ? 'active' : '';
      themeButtonsHTML += `
        <button
          class="qs-theme-btn ${isActive}"
          data-theme="${themeKey}"
          title="${theme.description}"
          style="--btn-sidebar: ${theme.colors.sidebar}; --btn-accent: ${theme.colors.accent};"
        >
          <span class="qs-theme-icon">${theme.icon}</span>
          <span class="qs-theme-name">${theme.name}</span>
        </button>
      `;
    });

    // Build menu toggles HTML
    let menuTogglesHTML = '';
    Object.keys(CONFIG.menuItems).forEach(itemKey => {
      const item = CONFIG.menuItems[itemKey];
      const isVisible = menuVisibility[itemKey] !== false;
      menuTogglesHTML += `
        <label class="qs-toggle-row">
          <span class="qs-toggle-label">${item.name}</span>
          <div class="qs-toggle-switch">
            <input type="checkbox" data-menu-item="${itemKey}" ${isVisible ? 'checked' : ''}>
            <span class="qs-toggle-slider"></span>
          </div>
        </label>
      `;
    });

    const container = document.createElement('div');
    container.id = 'qurio-settings-panel';

    container.innerHTML = `
      <style>
        /* Settings Trigger Button */
        #qurio-settings-trigger {
          position: fixed;
          ${getPositionStyles()}
          z-index: 99999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--ql-primary, #1a2332);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        #qurio-settings-trigger:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }

        #qurio-settings-trigger svg {
          width: 24px;
          height: 24px;
          fill: var(--ql-accent, #c9a961);
          transition: transform 0.5s ease;
        }

        #qurio-settings-trigger:hover svg {
          transform: rotate(90deg);
        }

        #qurio-settings-trigger.active svg {
          transform: rotate(180deg);
        }

        /* Settings Panel */
        #qurio-settings-container {
          position: fixed;
          bottom: 80px;
          right: 20px;
          z-index: 99998;
          width: 320px;
          max-height: calc(100vh - 120px);
          background: var(--ql-surface-elevated, #ffffff);
          border: 1px solid var(--ql-border, #e0e0e0);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.95);
          transition: all 0.3s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        #qurio-settings-container.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        /* Panel Header */
        .qs-header {
          padding: 16px 20px;
          background: var(--ql-primary, #1a2332);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .qs-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          font-family: var(--ql-font-body, system-ui, sans-serif);
        }

        .qs-close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          display: flex;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .qs-close-btn:hover {
          opacity: 1;
        }

        /* Panel Content */
        .qs-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        /* Section */
        .qs-section {
          border-bottom: 1px solid var(--ql-border, #e0e0e0);
        }

        .qs-section:last-child {
          border-bottom: none;
        }

        .qs-section-header {
          padding: 14px 20px;
          background: var(--ql-surface, #f8f9fa);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s;
          user-select: none;
        }

        .qs-section-header:hover {
          background: var(--ql-surface-hover, #f0f1f2);
        }

        .qs-section-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ql-text-primary, #1a2332);
          font-family: var(--ql-font-body, system-ui, sans-serif);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .qs-section-arrow {
          transition: transform 0.3s ease;
          color: var(--ql-text-secondary, #6b7280);
        }

        .qs-section.expanded .qs-section-arrow {
          transform: rotate(180deg);
        }

        .qs-section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .qs-section.expanded .qs-section-content {
          max-height: 1000px;
        }

        .qs-section-inner {
          padding: 12px 20px 16px;
        }

        /* Theme Buttons */
        .qs-themes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .qs-theme-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border: 2px solid var(--ql-border, #e0e0e0);
          border-radius: 8px;
          background: linear-gradient(135deg, var(--btn-sidebar) 0%, var(--btn-sidebar) 50%, var(--btn-accent) 50%, var(--btn-accent) 100%);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .qs-theme-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.9);
          z-index: 1;
        }

        .qs-theme-btn:hover {
          border-color: var(--ql-primary, #1a2332);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .qs-theme-btn.active {
          border-color: var(--ql-accent, #c9a961);
          border-width: 2px;
          box-shadow: 0 0 0 2px rgba(201, 169, 97, 0.3);
        }

        .qs-theme-icon {
          font-size: 18px;
          position: relative;
          z-index: 2;
        }

        .qs-theme-name {
          font-size: 11px;
          font-weight: 500;
          color: var(--ql-text-primary, #1a2332);
          position: relative;
          z-index: 2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Toggle Switches */
        .qs-toggles-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .qs-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 4px;
          padding-left: 4px;
          padding-right: 4px;
        }

        .qs-toggle-row:hover {
          background: var(--ql-surface, #f8f9fa);
        }

        .qs-toggle-label {
          font-size: 13px;
          color: var(--ql-text-primary, #1a2332);
          font-family: var(--ql-font-body, system-ui, sans-serif);
        }

        .qs-toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .qs-toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .qs-toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: #ccc;
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .qs-toggle-slider::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .qs-toggle-switch input:checked + .qs-toggle-slider {
          background: var(--ql-accent, #c9a961);
        }

        .qs-toggle-switch input:checked + .qs-toggle-slider::before {
          transform: translateX(20px);
        }

        /* Bulk Actions */
        .qs-bulk-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--ql-border, #e0e0e0);
        }

        .qs-bulk-btn {
          flex: 1;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid var(--ql-border, #e0e0e0);
          border-radius: 6px;
          background: var(--ql-surface, #f8f9fa);
          color: var(--ql-text-primary, #1a2332);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--ql-font-body, system-ui, sans-serif);
        }

        .qs-bulk-btn:hover {
          background: var(--ql-primary, #1a2332);
          color: white;
          border-color: var(--ql-primary, #1a2332);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          #qurio-settings-container {
            width: calc(100vw - 40px);
            right: 20px;
            left: 20px;
            bottom: 80px;
          }
        }

        /* Animation */
        @keyframes qs-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #qurio-settings-trigger {
          animation: qs-fade-in 0.5s ease;
        }
      </style>

      <!-- Settings Trigger Button -->
      <button id="qurio-settings-trigger" title="Qurio Settings" aria-label="Open Qurio Settings">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      </button>

      <!-- Settings Panel -->
      <div id="qurio-settings-container">
        <div class="qs-header">
          <h3>Qurio Settings</h3>
          <button class="qs-close-btn" aria-label="Close settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div class="qs-content">
          <!-- Theme Section -->
          <div class="qs-section expanded" data-section="themes">
            <div class="qs-section-header">
              <span class="qs-section-title">Theme</span>
              <svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <div class="qs-section-content">
              <div class="qs-section-inner">
                <div class="qs-themes-grid">
                  ${themeButtonsHTML}
                </div>
              </div>
            </div>
          </div>

          <!-- Menu Visibility Section -->
          <div class="qs-section expanded" data-section="menu">
            <div class="qs-section-header">
              <span class="qs-section-title">Menu Items</span>
              <svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <div class="qs-section-content">
              <div class="qs-section-inner">
                <div class="qs-bulk-actions">
                  <button class="qs-bulk-btn" data-action="show-all">Show All</button>
                  <button class="qs-bulk-btn" data-action="hide-all">Hide All</button>
                </div>
                <div class="qs-toggles-list">
                  ${menuTogglesHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Event Listeners
    const trigger = container.querySelector('#qurio-settings-trigger');
    const panel = container.querySelector('#qurio-settings-container');
    const closeBtn = container.querySelector('.qs-close-btn');

    // Toggle panel
    trigger.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      trigger.classList.toggle('active', isOpen);
    });

    // Close panel
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      trigger.classList.remove('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        panel.classList.remove('open');
        trigger.classList.remove('active');
      }
    });

    // Section collapse/expand
    container.querySelectorAll('.qs-section-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('expanded');
      });
    });

    // Theme buttons
    container.querySelectorAll('.qs-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        applyTheme(theme);

        // Update active state
        container.querySelectorAll('.qs-theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Menu toggles
    container.querySelectorAll('.qs-toggle-switch input').forEach(toggle => {
      toggle.addEventListener('change', () => {
        const itemKey = toggle.getAttribute('data-menu-item');
        setMenuItemVisibility(itemKey, toggle.checked);
      });
    });

    // Bulk actions
    container.querySelector('[data-action="show-all"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.menuItems).forEach(key => {
        visibility[key] = true;
      });
      saveMenuVisibility(visibility);
      applyMenuVisibility(visibility);

      // Update all toggles
      container.querySelectorAll('.qs-toggle-switch input').forEach(toggle => {
        toggle.checked = true;
      });
    });

    container.querySelector('[data-action="hide-all"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.menuItems).forEach(key => {
        visibility[key] = false;
      });
      saveMenuVisibility(visibility);
      applyMenuVisibility(visibility);

      // Update all toggles
      container.querySelectorAll('.qs-toggle-switch input').forEach(toggle => {
        toggle.checked = false;
      });
    });

    log('Settings panel created');
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    log('Initializing Qurio Settings Panel v3.0.0...');

    // Apply saved theme immediately
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme, false);

    // Apply saved menu visibility
    const menuVisibility = getMenuVisibility();
    applyMenuVisibility(menuVisibility);

    // Create UI and initialize Usertour when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        createSettingsPanel();
        initUsertour();
        setupMenuObserver();
      });
    } else {
      createSettingsPanel();
      initUsertour();
      setupMenuObserver();
    }

    log('Qurio Settings Panel initialized');
  }

  // Watch for sidebar changes (SPA navigation) and re-apply visibility
  function setupMenuObserver() {
    // Debounce function to prevent excessive calls
    let debounceTimer;
    const debouncedApply = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const visibility = getMenuVisibility();
        applyMenuVisibility(visibility);
      }, 100);
    };

    // Observe the sidebar for changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          debouncedApply();
          break;
        }
      }
    });

    // Start observing when sidebar exists
    const startObserving = () => {
      const sidebar = document.getElementById('sidebar-v2');
      if (sidebar) {
        observer.observe(sidebar, { childList: true, subtree: true });
        log('Menu observer started');
        // Also re-apply immediately in case we missed initial load
        debouncedApply();
      } else {
        // Sidebar not found, try again shortly
        setTimeout(startObserving, 500);
      }
    };

    startObserving();
  }

  // ============================================
  // PUBLIC API
  // ============================================

  window.QurioThemes = {
    // Theme methods
    apply: applyTheme,
    get current() {
      return getCurrentTheme();
    },
    themes: CONFIG.themes,

    // Menu visibility methods
    getMenuVisibility: getMenuVisibility,
    setMenuItemVisibility: setMenuItemVisibility,
    menuItems: CONFIG.menuItems,

    // Config
    config: CONFIG,
    version: '3.0.1',

    // UI
    createSettings: createSettingsPanel,

    // Event listeners
    onChange: function(callback) {
      window.addEventListener('ql-theme-changed', (e) => {
        callback(e.detail.theme, e.detail.themeData);
      });
    },
    onMenuChange: function(callback) {
      window.addEventListener('ql-menu-visibility-changed', (e) => {
        callback(e.detail.item, e.detail.visible, e.detail.visibility);
      });
    },

    // Theme navigation
    list: () => Object.keys(CONFIG.themes),
    next: function() {
      const themes = Object.keys(CONFIG.themes);
      const currentIndex = themes.indexOf(getCurrentTheme());
      const nextIndex = (currentIndex + 1) % themes.length;
      applyTheme(themes[nextIndex]);
      return themes[nextIndex];
    },
    prev: function() {
      const themes = Object.keys(CONFIG.themes);
      const currentIndex = themes.indexOf(getCurrentTheme());
      const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
      applyTheme(themes[prevIndex]);
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
 * // Theme Management
 * QurioThemes.apply('emerald');
 * console.log(QurioThemes.current);
 * QurioThemes.next();
 * QurioThemes.prev();
 *
 * // Menu Visibility
 * QurioThemes.setMenuItemVisibility('launchpad', false); // Hide Launchpad
 * QurioThemes.setMenuItemVisibility('dashboard', true);  // Show Dashboard
 * console.log(QurioThemes.getMenuVisibility());
 *
 * // Event Listeners
 * QurioThemes.onChange((theme, data) => {
 *   console.log('Theme changed:', theme);
 * });
 *
 * QurioThemes.onMenuChange((item, visible, allVisibility) => {
 *   console.log('Menu item changed:', item, visible);
 * });
 */
</script>
