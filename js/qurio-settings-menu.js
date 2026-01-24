<script>
/**
 * QURIO SETTINGS MENU VISIBILITY
 * Version: 4.0.0
 *
 * Settings menu visibility management
 * Requires: qurio-config.js, qurio-utils.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Settings Menu] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var CONFIG = window.Qurio.CONFIG;
  var log = window.Qurio.log || console.log;
  var ensureStyleElement = window.Qurio.ensureStyleElement;

  /**
   * Get settings menu visibility from localStorage
   */
  function getSettingsMenuVisibility() {
    try {
      var stored = localStorage.getItem(CONFIG.storageKeys.settingsMenuVisibility);
      if (stored) {
        var parsed = JSON.parse(stored);
        log('Retrieved settings menu visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access settings menu visibility from localStorage:', e);
    }

    // Return defaults
    var defaults = {};
    Object.keys(CONFIG.settingsMenuItems).forEach(function(key) {
      defaults[key] = CONFIG.settingsMenuItems[key].default;
    });
    log('Using default settings menu visibility');
    return defaults;
  }

  /**
   * Save settings menu visibility to localStorage
   */
  function saveSettingsMenuVisibility(visibility) {
    try {
      localStorage.setItem(CONFIG.storageKeys.settingsMenuVisibility, JSON.stringify(visibility));
      log('Saved settings menu visibility to storage:', visibility);
      return true;
    } catch (e) {
      log('Could not save settings menu visibility to localStorage:', e);
      return false;
    }
  }

  /**
   * Apply settings menu visibility via CSS
   */
  function applySettingsMenuVisibility(visibility) {
    var styleEl = ensureStyleElement('qurio-settings-menu-visibility-styles');
    if (!styleEl) return;

    // Build CSS rules for hidden items
    var css = '';
    Object.keys(visibility).forEach(function(key) {
      if (!visibility[key] && CONFIG.settingsMenuItems[key]) {
        var item = CONFIG.settingsMenuItems[key];
        // High specificity selectors to override theme styles
        css += 'html #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
        css += 'html:not([data-ql-theme="none"]) #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
        css += 'html body #sidebar-v2 nav ' + item.selector + ' { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n';
      }
    });

    styleEl.textContent = css;
    log('Applied settings menu visibility CSS');

    // Also apply via direct DOM manipulation as a fallback
    Object.keys(visibility).forEach(function(key) {
      if (CONFIG.settingsMenuItems[key]) {
        var item = CONFIG.settingsMenuItems[key];
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
          log('Could not apply settings visibility to', key, e);
        }
      }
    });
  }

  /**
   * Set visibility for a single settings menu item
   */
  function setSettingsMenuItemVisibility(itemKey, visible) {
    var visibility = getSettingsMenuVisibility();
    visibility[itemKey] = visible;
    saveSettingsMenuVisibility(visibility);
    applySettingsMenuVisibility(visibility);

    // Update toggle in UI if exists
    var toggle = document.querySelector('#qurio-settings-panel [data-settings-menu-item="' + itemKey + '"]');
    if (toggle) {
      toggle.checked = visible;
    }

    // Dispatch event
    var event = new CustomEvent('ql-settings-menu-visibility-changed', {
      detail: { item: itemKey, visible: visible, visibility: visibility }
    });
    window.dispatchEvent(event);
  }

  // Export settings menu visibility functions
  window.Qurio.settingsMenuVisibility = {
    get: getSettingsMenuVisibility,
    save: saveSettingsMenuVisibility,
    apply: applySettingsMenuVisibility,
    setItem: setSettingsMenuItemVisibility
  };

  console.log('[Qurio] Settings menu visibility module loaded');

})();
</script>
