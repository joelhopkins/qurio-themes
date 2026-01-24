<script>
/**
 * QURIO THEME
 * Version: 4.0.0
 *
 * Theme management for Qurio
 * Requires: qurio-config.js, qurio-utils.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Theme] ERROR: qurio-config.js must be loaded first');
    return;
  }

  const CONFIG = window.Qurio.CONFIG;
  const log = window.Qurio.log || console.log;

  /**
   * Get current theme from localStorage
   */
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

  /**
   * Save theme preference to localStorage
   */
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

  /**
   * Apply a theme
   */
  function applyTheme(themeName, savePreference) {
    if (savePreference === undefined) savePreference = true;

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

    // Dispatch event
    var event = new CustomEvent('ql-theme-changed', {
      detail: { theme: themeName, themeData: CONFIG.themes[themeName] }
    });
    window.dispatchEvent(event);

    // Update Usertour if available
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

  // Export theme functions
  window.Qurio.theme = {
    getCurrent: getCurrentTheme,
    save: saveTheme,
    apply: applyTheme
  };

  console.log('[Qurio] Theme module loaded');

})();
</script>
