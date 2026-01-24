<script>
/**
 * QURIO OBSERVER
 * Version: 4.0.0
 *
 * MutationObserver setup for SPA navigation
 * Requires: qurio-config.js, qurio-utils.js, and visibility modules
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Observer] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var log = window.Qurio.log || console.log;

  /**
   * Setup MutationObservers to watch for DOM changes
   */
  function setupMenuObserver() {
    // Debounce function to prevent excessive calls
    var debounceTimer;
    var debouncedApply = function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        // Re-apply all visibility settings
        if (window.Qurio.menuVisibility) {
          var visibility = window.Qurio.menuVisibility.get();
          window.Qurio.menuVisibility.apply(visibility);
        }
        if (window.Qurio.settingsMenuVisibility) {
          var settingsVisibility = window.Qurio.settingsMenuVisibility.get();
          window.Qurio.settingsMenuVisibility.apply(settingsVisibility);
        }
        if (window.Qurio.uiElementsVisibility) {
          var uiVisibility = window.Qurio.uiElementsVisibility.get();
          window.Qurio.uiElementsVisibility.apply(uiVisibility);
        }
      }, 100);
    };

    // Observe the sidebar for changes
    var sidebarObserver = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          debouncedApply();
          break;
        }
      }
    });

    // Separate observer for body/content to catch UI elements like tabs
    var contentObserver = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain elements we care about
          for (var j = 0; j < mutation.addedNodes.length; j++) {
            var node = mutation.addedNodes[j];
            if (node.nodeType === 1) { // Element node
              // Look for tab navigations or nav elements
              var isRelevant = false;
              try {
                if (node.matches) {
                  isRelevant = node.matches('.n-tabs-nav, .hl_affiliate--nav, [class*="tabs"], [class*="nav"]');
                }
                if (!isRelevant && node.querySelector) {
                  isRelevant = !!node.querySelector('.n-tabs-nav, .hl_affiliate--nav, [class*="tabs"]');
                }
              } catch (e) {
                // matches or querySelector failed, skip
              }
              if (isRelevant) {
                debouncedApply();
                break;
              }
            }
          }
        }
      }
    });

    // Start observing when sidebar exists
    var startObserving = function() {
      var sidebar = document.getElementById('sidebar-v2');
      if (sidebar) {
        sidebarObserver.observe(sidebar, { childList: true, subtree: true });
        log('Sidebar observer started');
      } else {
        // Sidebar not found, try again shortly
        setTimeout(startObserving, 500);
      }

      // Observe document body for all content changes (catches SPA navigation)
      if (document.body) {
        contentObserver.observe(document.body, { childList: true, subtree: true });
        log('Body content observer started');
      }

      // Re-apply immediately in case we missed initial load
      debouncedApply();
    };

    startObserving();
  }

  // Export observer functions
  window.Qurio.observer = {
    setup: setupMenuObserver
  };

  console.log('[Qurio] Observer module loaded');

})();
</script>
