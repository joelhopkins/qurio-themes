<script>
/**
 * QURIO UTILS
 * Version: 4.0.0
 *
 * Utility functions for Qurio theme system
 * Requires: qurio-config.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Utils] ERROR: qurio-config.js must be loaded first');
    return;
  }

  const CONFIG = window.Qurio.CONFIG;

  /**
   * Debug logging function
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Qurio]', ...args);
    }
  }

  /**
   * Ensures a style element exists and is attached to the DOM
   * @param {string} id - The ID for the style element
   * @returns {HTMLStyleElement|null} - The style element or null if failed
   */
  function ensureStyleElement(id) {
    let styleEl = document.getElementById(id);

    // Check if element exists AND is attached to the DOM
    if (!styleEl || !styleEl.parentElement) {
      // Remove detached element if it exists
      if (styleEl) {
        styleEl.remove();
      }
      // Create new element
      styleEl = document.createElement('style');
      styleEl.id = id;

      // Append to head, with fallback to documentElement
      const target = document.head || document.documentElement;
      if (target) {
        target.appendChild(styleEl);
        log('Created and attached style element:', id);
      } else {
        console.error('[Qurio Utils] ERROR: Could not find head or documentElement');
        return null;
      }
    }

    return styleEl;
  }

  // Export utilities
  window.Qurio.log = log;
  window.Qurio.ensureStyleElement = ensureStyleElement;

  console.log('[Qurio] Utils loaded');

})();
</script>
