<script>
/**
 * QURIO USERTOUR
 * Version: 4.0.0
 *
 * Usertour.js integration for product tours
 * Requires: qurio-config.js, qurio-utils.js, qurio-theme.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Usertour] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var CONFIG = window.Qurio.CONFIG;
  var log = window.Qurio.log || console.log;

  /**
   * Get location ID from URL
   */
  function getLocationId() {
    var match = window.location.pathname.match(/location\/([^\/]+)/);
    return match ? match[1] : null;
  }

  /**
   * Load Usertour.js script
   */
  function loadUsertourScript() {
    return new Promise(function(resolve, reject) {
      if (window.usertour && typeof window.usertour.init === 'function') {
        resolve(window.usertour);
        return;
      }

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://js.usertour.io/legacy/usertour.iife.js';

      script.onload = function() {
        log('Usertour.js script loaded');
        resolve(window.usertour);
      };

      script.onerror = function() {
        log('Failed to load Usertour.js script');
        reject(new Error('Failed to load Usertour.js'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Initialize Usertour
   */
  function initUsertour() {
    if (!CONFIG.usertour.enabled) {
      log('Usertour is disabled in config');
      return Promise.resolve();
    }

    return loadUsertourScript().then(function() {
      window.usertour.init(CONFIG.usertour.token);
      log('Usertour initialized with token');

      var locationId = getLocationId();
      var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'light';

      if (locationId) {
        window.usertour.identify(locationId, {
          location_id: locationId,
          theme: currentTheme,
          identified_at: new Date().toISOString()
        });
        log('Usertour identified user by LocationID:', locationId);
      } else {
        window.usertour.identifyAnonymous({
          theme: currentTheme,
          identified_at: new Date().toISOString()
        });
        log('Usertour using anonymous identification');
      }
    }).catch(function(error) {
      log('Usertour initialization error:', error);
    });
  }

  // Export Usertour functions
  window.Qurio.usertour = {
    init: initUsertour,
    getLocationId: getLocationId
  };

  console.log('[Qurio] Usertour module loaded');

})();
</script>
