<script>
/**
 * QURIO MENU VISIBILITY
 * Version: 4.0.0
 *
 * Main menu visibility management
 * Requires: qurio-config.js, qurio-utils.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Menu] ERROR: qurio-config.js must be loaded first');
    return;
  }

  const CONFIG = window.Qurio.CONFIG;
  const log = window.Qurio.log || console.log;
  const ensureStyleElement = window.Qurio.ensureStyleElement;

  /**
   * Get menu visibility settings from localStorage
   */
  function getMenuVisibility() {
    try {
      var stored = localStorage.getItem(CONFIG.storageKeys.menuVisibility);
      if (stored) {
        var parsed = JSON.parse(stored);
        log('Retrieved menu visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access menu visibility from localStorage:', e);
    }

    // Return defaults
    var defaults = {};
    Object.keys(CONFIG.menuItems).forEach(function(key) {
      defaults[key] = CONFIG.menuItems[key].default;
    });
    log('Using default menu visibility');
    return defaults;
  }

  /**
   * Save menu visibility settings to localStorage
   */
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

  /**
   * Apply menu visibility settings via CSS
   */
  function applyMenuVisibility(visibility) {
    var styleEl = ensureStyleElement('qurio-menu-visibility-styles');
    if (!styleEl) return;

    // Build CSS rules for hidden items
    var css = '';
    Object.keys(visibility).forEach(function(key) {
      if (!visibility[key] && CONFIG.menuItems[key]) {
        var item = CONFIG.menuItems[key];
        // High specificity selectors to override theme styles
        css += 'html #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
        css += 'html:not([data-ql-theme="none"]) #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
        css += 'html body #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
      }
    });

    styleEl.textContent = css;
    log('Applied menu visibility CSS');

    // Also apply via direct DOM manipulation as a fallback
    Object.keys(visibility).forEach(function(key) {
      if (CONFIG.menuItems[key]) {
        var item = CONFIG.menuItems[key];
        try {
          var elements = document.querySelectorAll(item.selector);
          elements.forEach(function(el) {
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

  /**
   * Set visibility for a single menu item
   */
  function setMenuItemVisibility(itemKey, visible) {
    var visibility = getMenuVisibility();
    visibility[itemKey] = visible;
    saveMenuVisibility(visibility);
    applyMenuVisibility(visibility);

    // Update toggle in UI if exists
    var toggle = document.querySelector('#qurio-settings-panel [data-menu-item="' + itemKey + '"]');
    if (toggle) {
      toggle.checked = visible;
    }

    // Dispatch event
    var event = new CustomEvent('ql-menu-visibility-changed', {
      detail: { item: itemKey, visible: visible, visibility: visibility }
    });
    window.dispatchEvent(event);
  }

  // Export menu visibility functions
  window.Qurio.menuVisibility = {
    get: getMenuVisibility,
    save: saveMenuVisibility,
    apply: applyMenuVisibility,
    setItem: setMenuItemVisibility
  };

  console.log('[Qurio] Menu visibility module loaded');

})();
</script>
