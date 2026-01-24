<script>
/**
 * QURIO PANEL
 * Version: 4.0.0
 *
 * Settings panel UI
 * Requires: qurio-config.js, qurio-utils.js, qurio-theme.js,
 *           qurio-menu-visibility.js, qurio-settings-menu.js, qurio-ui-elements.js
 */

(function() {
  'use strict';

  // Ensure namespace exists
  window.Qurio = window.Qurio || {};

  // Check for required dependencies
  if (!window.Qurio.CONFIG) {
    console.error('[Qurio Panel] ERROR: qurio-config.js must be loaded first');
    return;
  }

  var CONFIG = window.Qurio.CONFIG;
  var log = window.Qurio.log || console.log;

  /**
   * Create the settings panel
   */
  function createSettingsPanel() {
    if (document.getElementById('qurio-settings-panel')) {
      log('Settings panel already exists');
      return;
    }

    if (!CONFIG.showSettings) {
      log('Settings panel disabled in config');
      return;
    }

    // Get current states
    var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'light';
    var menuVisibility = window.Qurio.menuVisibility ? window.Qurio.menuVisibility.get() : {};
    var settingsMenuVisibility = window.Qurio.settingsMenuVisibility ? window.Qurio.settingsMenuVisibility.get() : {};
    var uiElementsVisibility = window.Qurio.uiElementsVisibility ? window.Qurio.uiElementsVisibility.get() : {};

    // Build theme buttons HTML
    var themeButtonsHTML = '';
    Object.keys(CONFIG.themes).forEach(function(themeKey) {
      var theme = CONFIG.themes[themeKey];
      var isActive = themeKey === currentTheme ? 'active' : '';
      themeButtonsHTML += '<button class="qs-theme-btn ' + isActive + '" data-theme="' + themeKey + '" title="' + theme.description + '" style="--btn-sidebar: ' + theme.colors.sidebar + '; --btn-accent: ' + theme.colors.accent + ';">';
      themeButtonsHTML += '<span class="qs-theme-icon">' + theme.icon + '</span>';
      themeButtonsHTML += '<span class="qs-theme-name">' + theme.name + '</span>';
      themeButtonsHTML += '</button>';
    });

    // Build menu toggles HTML
    var menuTogglesHTML = '';
    Object.keys(CONFIG.menuItems).forEach(function(itemKey) {
      var item = CONFIG.menuItems[itemKey];
      var isVisible = menuVisibility[itemKey] !== false;
      menuTogglesHTML += '<label class="qs-toggle-row">';
      menuTogglesHTML += '<span class="qs-toggle-label">' + item.name + '</span>';
      menuTogglesHTML += '<div class="qs-toggle-switch">';
      menuTogglesHTML += '<input type="checkbox" data-menu-item="' + itemKey + '"' + (isVisible ? ' checked' : '') + '>';
      menuTogglesHTML += '<span class="qs-toggle-slider"></span>';
      menuTogglesHTML += '</div></label>';
    });

    // Build settings menu toggles HTML (grouped by section)
    var settingsMenuTogglesHTML = '';
    var currentGroup = '';
    Object.keys(CONFIG.settingsMenuItems).forEach(function(itemKey) {
      var item = CONFIG.settingsMenuItems[itemKey];
      var isVisible = settingsMenuVisibility[itemKey] !== false;

      // Add group header if group changed
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        settingsMenuTogglesHTML += '<div class="qs-toggle-group-header">' + item.group + '</div>';
      }

      settingsMenuTogglesHTML += '<label class="qs-toggle-row">';
      settingsMenuTogglesHTML += '<span class="qs-toggle-label">' + item.name + '</span>';
      settingsMenuTogglesHTML += '<div class="qs-toggle-switch">';
      settingsMenuTogglesHTML += '<input type="checkbox" data-settings-menu-item="' + itemKey + '"' + (isVisible ? ' checked' : '') + '>';
      settingsMenuTogglesHTML += '<span class="qs-toggle-slider"></span>';
      settingsMenuTogglesHTML += '</div></label>';
    });

    // Build UI elements toggles HTML (grouped by section)
    var uiElementsTogglesHTML = '';
    var currentUIGroup = '';
    Object.keys(CONFIG.uiElements).forEach(function(itemKey) {
      var item = CONFIG.uiElements[itemKey];
      var isVisible = uiElementsVisibility[itemKey] !== false;

      // Add group header if group changed
      if (item.group !== currentUIGroup) {
        currentUIGroup = item.group;
        uiElementsTogglesHTML += '<div class="qs-toggle-group-header">' + item.group + '</div>';
      }

      uiElementsTogglesHTML += '<label class="qs-toggle-row">';
      uiElementsTogglesHTML += '<span class="qs-toggle-label">' + item.name + '</span>';
      uiElementsTogglesHTML += '<div class="qs-toggle-switch">';
      uiElementsTogglesHTML += '<input type="checkbox" data-ui-element="' + itemKey + '"' + (isVisible ? ' checked' : '') + '>';
      uiElementsTogglesHTML += '<span class="qs-toggle-slider"></span>';
      uiElementsTogglesHTML += '</div></label>';
    });

    // Create container
    var container = document.createElement('div');
    container.id = 'qurio-settings-panel';

    // Build panel HTML
    var panelHTML = '';

    // Settings Trigger Button
    panelHTML += '<button id="qurio-settings-trigger" title="Qurio Settings" aria-label="Open Qurio Settings">';
    panelHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">';
    panelHTML += '<path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>';
    panelHTML += '</svg></button>';

    // Settings Panel
    panelHTML += '<div id="qurio-settings-container">';
    panelHTML += '<div class="qs-header"><h3>Qurio Settings</h3>';
    panelHTML += '<button class="qs-close-btn" aria-label="Close settings">';
    panelHTML += '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">';
    panelHTML += '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>';
    panelHTML += '</svg></button></div>';

    panelHTML += '<div class="qs-content">';

    // Theme Section
    panelHTML += '<div class="qs-section expanded" data-section="themes">';
    panelHTML += '<div class="qs-section-header"><span class="qs-section-title">Theme</span>';
    panelHTML += '<svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">';
    panelHTML += '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></div>';
    panelHTML += '<div class="qs-section-content"><div class="qs-section-inner">';
    panelHTML += '<div class="qs-themes-grid">' + themeButtonsHTML + '</div>';
    panelHTML += '</div></div></div>';

    // Menu Visibility Section
    panelHTML += '<div class="qs-section expanded" data-section="menu">';
    panelHTML += '<div class="qs-section-header"><span class="qs-section-title">Main Menu</span>';
    panelHTML += '<svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">';
    panelHTML += '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></div>';
    panelHTML += '<div class="qs-section-content"><div class="qs-section-inner">';
    panelHTML += '<div class="qs-bulk-actions">';
    panelHTML += '<button class="qs-bulk-btn" data-action="show-all">Show All</button>';
    panelHTML += '<button class="qs-bulk-btn" data-action="hide-all">Hide All</button></div>';
    panelHTML += '<div class="qs-toggles-list">' + menuTogglesHTML + '</div>';
    panelHTML += '</div></div></div>';

    // Settings Menu Visibility Section
    panelHTML += '<div class="qs-section" data-section="settings-menu">';
    panelHTML += '<div class="qs-section-header"><span class="qs-section-title">Settings Menu</span>';
    panelHTML += '<svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">';
    panelHTML += '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></div>';
    panelHTML += '<div class="qs-section-content"><div class="qs-section-inner">';
    panelHTML += '<div class="qs-bulk-actions">';
    panelHTML += '<button class="qs-bulk-btn" data-action="show-all-settings">Show All</button>';
    panelHTML += '<button class="qs-bulk-btn" data-action="hide-all-settings">Hide All</button></div>';
    panelHTML += '<div class="qs-toggles-list">' + settingsMenuTogglesHTML + '</div>';
    panelHTML += '</div></div></div>';

    // UI Elements Visibility Section
    panelHTML += '<div class="qs-section" data-section="ui-elements">';
    panelHTML += '<div class="qs-section-header"><span class="qs-section-title">Interface Elements</span>';
    panelHTML += '<svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">';
    panelHTML += '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></div>';
    panelHTML += '<div class="qs-section-content"><div class="qs-section-inner">';
    panelHTML += '<div class="qs-bulk-actions">';
    panelHTML += '<button class="qs-bulk-btn" data-action="show-all-ui">Show All</button>';
    panelHTML += '<button class="qs-bulk-btn" data-action="hide-all-ui">Hide All</button></div>';
    panelHTML += '<div class="qs-toggles-list">' + uiElementsTogglesHTML + '</div>';
    panelHTML += '</div></div></div>';

    panelHTML += '</div></div>';

    container.innerHTML = panelHTML;
    document.body.appendChild(container);

    // Setup event listeners
    setupEventListeners(container);

    log('Settings panel created');
  }

  /**
   * Setup event listeners for the settings panel
   */
  function setupEventListeners(container) {
    var trigger = container.querySelector('#qurio-settings-trigger');
    var panel = container.querySelector('#qurio-settings-container');
    var closeBtn = container.querySelector('.qs-close-btn');

    // Toggle panel
    trigger.addEventListener('click', function() {
      var isOpen = panel.classList.toggle('open');
      trigger.classList.toggle('active', isOpen);
    });

    // Close panel
    closeBtn.addEventListener('click', function() {
      panel.classList.remove('open');
      trigger.classList.remove('active');
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) {
        panel.classList.remove('open');
        trigger.classList.remove('active');
      }
    });

    // Section collapse/expand
    container.querySelectorAll('.qs-section-header').forEach(function(header) {
      header.addEventListener('click', function() {
        header.parentElement.classList.toggle('expanded');
      });
    });

    // Theme buttons
    container.querySelectorAll('.qs-theme-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var theme = btn.getAttribute('data-theme');
        if (window.Qurio.theme) {
          window.Qurio.theme.apply(theme);
        }

        // Update active state
        container.querySelectorAll('.qs-theme-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });

    // Main menu toggles
    container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(function(toggle) {
      toggle.addEventListener('change', function() {
        var itemKey = toggle.getAttribute('data-menu-item');
        if (window.Qurio.menuVisibility) {
          window.Qurio.menuVisibility.setItem(itemKey, toggle.checked);
        }
      });
    });

    // Settings menu toggles
    container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(function(toggle) {
      toggle.addEventListener('change', function() {
        var itemKey = toggle.getAttribute('data-settings-menu-item');
        if (window.Qurio.settingsMenuVisibility) {
          window.Qurio.settingsMenuVisibility.setItem(itemKey, toggle.checked);
        }
      });
    });

    // UI elements toggles
    container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(function(toggle) {
      toggle.addEventListener('change', function() {
        var itemKey = toggle.getAttribute('data-ui-element');
        if (window.Qurio.uiElementsVisibility) {
          window.Qurio.uiElementsVisibility.setItem(itemKey, toggle.checked);
        }
      });
    });

    // Main menu bulk actions
    var showAllBtn = container.querySelector('[data-action="show-all"]');
    if (showAllBtn) {
      showAllBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.menuItems).forEach(function(key) {
          visibility[key] = true;
        });
        if (window.Qurio.menuVisibility) {
          window.Qurio.menuVisibility.save(visibility);
          window.Qurio.menuVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(function(toggle) {
          toggle.checked = true;
        });
      });
    }

    var hideAllBtn = container.querySelector('[data-action="hide-all"]');
    if (hideAllBtn) {
      hideAllBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.menuItems).forEach(function(key) {
          visibility[key] = false;
        });
        if (window.Qurio.menuVisibility) {
          window.Qurio.menuVisibility.save(visibility);
          window.Qurio.menuVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(function(toggle) {
          toggle.checked = false;
        });
      });
    }

    // Settings menu bulk actions
    var showAllSettingsBtn = container.querySelector('[data-action="show-all-settings"]');
    if (showAllSettingsBtn) {
      showAllSettingsBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.settingsMenuItems).forEach(function(key) {
          visibility[key] = true;
        });
        if (window.Qurio.settingsMenuVisibility) {
          window.Qurio.settingsMenuVisibility.save(visibility);
          window.Qurio.settingsMenuVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(function(toggle) {
          toggle.checked = true;
        });
      });
    }

    var hideAllSettingsBtn = container.querySelector('[data-action="hide-all-settings"]');
    if (hideAllSettingsBtn) {
      hideAllSettingsBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.settingsMenuItems).forEach(function(key) {
          visibility[key] = false;
        });
        if (window.Qurio.settingsMenuVisibility) {
          window.Qurio.settingsMenuVisibility.save(visibility);
          window.Qurio.settingsMenuVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(function(toggle) {
          toggle.checked = false;
        });
      });
    }

    // UI elements bulk actions
    var showAllUIBtn = container.querySelector('[data-action="show-all-ui"]');
    if (showAllUIBtn) {
      showAllUIBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.uiElements).forEach(function(key) {
          visibility[key] = true;
        });
        if (window.Qurio.uiElementsVisibility) {
          window.Qurio.uiElementsVisibility.save(visibility);
          window.Qurio.uiElementsVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(function(toggle) {
          toggle.checked = true;
        });
      });
    }

    var hideAllUIBtn = container.querySelector('[data-action="hide-all-ui"]');
    if (hideAllUIBtn) {
      hideAllUIBtn.addEventListener('click', function() {
        var visibility = {};
        Object.keys(CONFIG.uiElements).forEach(function(key) {
          visibility[key] = false;
        });
        if (window.Qurio.uiElementsVisibility) {
          window.Qurio.uiElementsVisibility.save(visibility);
          window.Qurio.uiElementsVisibility.apply(visibility);
        }
        container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(function(toggle) {
          toggle.checked = false;
        });
      });
    }
  }

  // Export panel functions
  window.Qurio.panel = {
    create: createSettingsPanel
  };

  console.log('[Qurio] Panel module loaded');

})();
</script>
