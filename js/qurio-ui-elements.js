<script>
/**
 * QURIO UI ELEMENTS VISIBILITY
 * Version: 4.0.0
 *
 * UI elements visibility management (tabs, buttons, etc.)
 * Requires: qurio-config.js, qurio-utils.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio UI Elements] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var CONFIG = window.Qurio.CONFIG;
  var log = window.Qurio.log || console.log;
  var ensureStyleElement = window.Qurio.ensureStyleElement;

  /**
   * Get UI elements visibility from localStorage
   */
  function getUIElementsVisibility() {
    try {
      var stored = localStorage.getItem(CONFIG.storageKeys.uiElementsVisibility);
      if (stored) {
        var parsed = JSON.parse(stored);
        log('Retrieved UI elements visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access UI elements visibility from localStorage:', e);
    }

    // Return defaults
    var defaults = {};
    Object.keys(CONFIG.uiElements).forEach(function(key) {
      defaults[key] = CONFIG.uiElements[key].default;
    });
    log('Using default UI elements visibility');
    return defaults;
  }

  /**
   * Save UI elements visibility to localStorage
   */
  function saveUIElementsVisibility(visibility) {
    try {
      localStorage.setItem(CONFIG.storageKeys.uiElementsVisibility, JSON.stringify(visibility));
      log('Saved UI elements visibility to storage:', visibility);
      return true;
    } catch (e) {
      log('Could not save UI elements visibility to localStorage:', e);
      return false;
    }
  }

  /**
   * Apply UI elements visibility via CSS and DOM manipulation
   */
  function applyUIElementsVisibility(visibility) {
    var styleEl = ensureStyleElement('qurio-ui-elements-visibility-styles');
    if (!styleEl) return;

    // Build CSS rules for selector-based items
    var css = '';

    Object.keys(CONFIG.uiElements).forEach(function(key) {
      var item = CONFIG.uiElements[key];
      var shouldShow = visibility[key] !== false;

      try {
        // Approach 1: CSS-based hiding for items with selector (preferred)
        if (item.selector && !shouldShow) {
          // Hide both the element and its wrapper
          css += item.selector + ' { display: none !important; visibility: hidden !important; }\n';
          css += '.n-tabs-tab-wrapper:has(' + item.selector + ') { display: none !important; visibility: hidden !important; }\n';
        }
        // Approach 2: JavaScript DOM manipulation for text-matching items
        else if (item.containerSelector && item.matchText) {
          var containers = document.querySelectorAll(item.containerSelector);
          containers.forEach(function(container) {
            // Find all links/items within the container
            var items = container.querySelectorAll('li, a, button, [role="tab"]');
            items.forEach(function(el) {
              // Check if text content matches
              var text = el.textContent.trim();
              if (text === item.matchText) {
                // Found the element - get the parent li if this is an anchor
                var targetEl = el.tagName === 'A' ? (el.closest('li') || el) : el;
                if (shouldShow) {
                  targetEl.style.removeProperty('display');
                  targetEl.style.removeProperty('visibility');
                } else {
                  targetEl.style.setProperty('display', 'none', 'important');
                  targetEl.style.setProperty('visibility', 'hidden', 'important');
                }
              }
            });
          });
        }
      } catch (e) {
        log('Could not apply UI element visibility to', key, e);
      }
    });

    styleEl.textContent = css;
    log('Applied UI elements visibility CSS');
  }

  /**
   * Set visibility for a single UI element
   */
  function setUIElementVisibility(itemKey, visible) {
    var visibility = getUIElementsVisibility();
    visibility[itemKey] = visible;
    saveUIElementsVisibility(visibility);
    applyUIElementsVisibility(visibility);

    // Update toggle in UI if exists
    var toggle = document.querySelector('#qurio-settings-panel [data-ui-element="' + itemKey + '"]');
    if (toggle) {
      toggle.checked = visible;
    }

    // Dispatch event
    var event = new CustomEvent('ql-ui-element-visibility-changed', {
      detail: { item: itemKey, visible: visible, visibility: visibility }
    });
    window.dispatchEvent(event);
  }

  // Export UI elements visibility functions
  window.Qurio.uiElementsVisibility = {
    get: getUIElementsVisibility,
    save: saveUIElementsVisibility,
    apply: applyUIElementsVisibility,
    setItem: setUIElementVisibility
  };

  console.log('[Qurio] UI elements visibility module loaded');

})();
</script>
