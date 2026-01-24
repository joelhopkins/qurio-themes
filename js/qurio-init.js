<script>
/**
 * QURIO INIT
 * Version: 4.0.0
 *
 * Initialization and public API
 * Must be loaded last - after all other modules
 *
 * Required load order:
 * 1. qurio-config.js
 * 2. qurio-utils.js
 * 3. qurio-theme.js
 * 4. qurio-menu-visibility.js
 * 5. qurio-settings-menu.js
 * 6. qurio-ui-elements.js
 * 7. qurio-usertour.js
 * 8. qurio-panel.js
 * 9. qurio-observer.js
 * 10. qurio-init.js (this file)
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Init] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var CONFIG = window.Qurio.CONFIG;
  var log = window.Qurio.log || console.log;

  /**
   * Main initialization function
   */
  function init() {
    log('Initializing Qurio Settings Panel v4.0.0...');

    // Apply saved theme immediately
    if (window.Qurio.theme) {
      var currentTheme = window.Qurio.theme.getCurrent();
      window.Qurio.theme.apply(currentTheme, false);
    }

    // Apply saved visibility settings
    if (window.Qurio.menuVisibility) {
      var menuVisibility = window.Qurio.menuVisibility.get();
      window.Qurio.menuVisibility.apply(menuVisibility);
    }

    if (window.Qurio.settingsMenuVisibility) {
      var settingsMenuVisibility = window.Qurio.settingsMenuVisibility.get();
      window.Qurio.settingsMenuVisibility.apply(settingsMenuVisibility);
    }

    if (window.Qurio.uiElementsVisibility) {
      var uiElementsVisibility = window.Qurio.uiElementsVisibility.get();
      window.Qurio.uiElementsVisibility.apply(uiElementsVisibility);
    }

    // Create UI and initialize when DOM is ready
    var onDOMReady = function() {
      if (window.Qurio.panel) {
        window.Qurio.panel.create();
      }

      if (window.Qurio.usertour) {
        window.Qurio.usertour.init();
      }

      if (window.Qurio.observer) {
        window.Qurio.observer.setup();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
      onDOMReady();
    }

    log('Qurio Settings Panel initialized');
  }

  // ============================================
  // PUBLIC API (backwards compatible with QurioThemes)
  // ============================================

  window.QurioThemes = {
    // Theme methods
    apply: function(themeName, save) {
      return window.Qurio.theme ? window.Qurio.theme.apply(themeName, save) : false;
    },
    get current() {
      return window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'light';
    },
    themes: CONFIG.themes,

    // Main menu visibility methods
    getMenuVisibility: function() {
      return window.Qurio.menuVisibility ? window.Qurio.menuVisibility.get() : {};
    },
    setMenuItemVisibility: function(itemKey, visible) {
      if (window.Qurio.menuVisibility) {
        window.Qurio.menuVisibility.setItem(itemKey, visible);
      }
    },
    menuItems: CONFIG.menuItems,

    // Settings menu visibility methods
    getSettingsMenuVisibility: function() {
      return window.Qurio.settingsMenuVisibility ? window.Qurio.settingsMenuVisibility.get() : {};
    },
    setSettingsMenuItemVisibility: function(itemKey, visible) {
      if (window.Qurio.settingsMenuVisibility) {
        window.Qurio.settingsMenuVisibility.setItem(itemKey, visible);
      }
    },
    settingsMenuItems: CONFIG.settingsMenuItems,

    // UI elements visibility methods
    getUIElementsVisibility: function() {
      return window.Qurio.uiElementsVisibility ? window.Qurio.uiElementsVisibility.get() : {};
    },
    setUIElementVisibility: function(itemKey, visible) {
      if (window.Qurio.uiElementsVisibility) {
        window.Qurio.uiElementsVisibility.setItem(itemKey, visible);
      }
    },
    uiElements: CONFIG.uiElements,

    // Config
    config: CONFIG,
    version: '4.0.0',

    // UI
    createSettings: function() {
      if (window.Qurio.panel) {
        window.Qurio.panel.create();
      }
    },

    // Event listeners
    onChange: function(callback) {
      window.addEventListener('ql-theme-changed', function(e) {
        callback(e.detail.theme, e.detail.themeData);
      });
    },
    onMenuChange: function(callback) {
      window.addEventListener('ql-menu-visibility-changed', function(e) {
        callback(e.detail.item, e.detail.visible, e.detail.visibility);
      });
    },
    onSettingsMenuChange: function(callback) {
      window.addEventListener('ql-settings-menu-visibility-changed', function(e) {
        callback(e.detail.item, e.detail.visible, e.detail.visibility);
      });
    },
    onUIElementChange: function(callback) {
      window.addEventListener('ql-ui-element-visibility-changed', function(e) {
        callback(e.detail.item, e.detail.visible, e.detail.visibility);
      });
    },

    // Theme navigation
    list: function() {
      return Object.keys(CONFIG.themes);
    },
    next: function() {
      var themes = Object.keys(CONFIG.themes);
      var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'light';
      var currentIndex = themes.indexOf(currentTheme);
      var nextIndex = (currentIndex + 1) % themes.length;
      if (window.Qurio.theme) {
        window.Qurio.theme.apply(themes[nextIndex]);
      }
      return themes[nextIndex];
    },
    prev: function() {
      var themes = Object.keys(CONFIG.themes);
      var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'light';
      var currentIndex = themes.indexOf(currentTheme);
      var prevIndex = (currentIndex - 1 + themes.length) % themes.length;
      if (window.Qurio.theme) {
        window.Qurio.theme.apply(themes[prevIndex]);
      }
      return themes[prevIndex];
    }
  };

  // Store init function
  window.Qurio.init = init;

  // Auto-initialize
  init();

  console.log('[Qurio] Init module loaded - v4.0.0 ready');

})();
</script>
