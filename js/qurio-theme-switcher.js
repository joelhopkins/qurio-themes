<script>
/**
 * QURIO SETTINGS PANEL
 * Version: 3.7.0
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

    // Main Menu Items Configuration
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

    // Settings Menu Items Configuration
    // These appear when user clicks Settings in the main menu
    settingsMenuItems: {
      // MY BUSINESS
      businessProfile: { name: 'Business Profile', selector: '#sb_business_info', default: true, group: 'My Business' },
      myProfile: { name: 'My Profile', selector: '#sb_profile', default: true, group: 'My Business' },
      billing: { name: 'Billing', selector: '#sb_saas-billing', default: true, group: 'My Business' },
      myStaff: { name: 'My Staff', selector: '#sb_my-staff', default: true, group: 'My Business' },
      opportunitiesPipelines: { name: 'Opportunities & Pipelines', selector: '#sb_Opportunities-Pipelines', default: true, group: 'My Business' },
      // BUSINESS SERVICES
      settingsCalendars: { name: 'Calendars', selector: 'a[meta="calendars"][href*="settings"]', default: true, group: 'Business Services' },
      conversationAI: { name: 'Conversation AI', selector: '#sb_conversation_ai_settings_v2', default: true, group: 'Business Services' },
      voiceAIAgents: { name: 'Voice AI Agents', selector: '#sb_ai_agent_settings', default: true, group: 'Business Services' },
      emailServices: { name: 'Email Services', selector: '#sb_location-email-services', default: true, group: 'Business Services' },
      phoneSystem: { name: 'Phone System', selector: '#sb_phone-system', default: true, group: 'Business Services' },
      whatsapp: { name: 'WhatsApp', selector: '#sb_whatsapp', default: true, group: 'Business Services' },
      // OTHER SETTINGS
      objects: { name: 'Objects', selector: '#sb_objects', default: true, group: 'Other Settings' },
      customFields: { name: 'Custom Fields', selector: '#sb_custom-fields-settings', default: true, group: 'Other Settings' },
      customValues: { name: 'Custom Values', selector: '#sb_custom-values', default: true, group: 'Other Settings' },
      manageScoring: { name: 'Manage Scoring', selector: '#sb_manage-scoring', default: true, group: 'Other Settings' },
      domainsUrlRedirects: { name: 'Domains & URL Redirects', selector: '#sb_domains-urlRedirects', default: true, group: 'Other Settings' },
      externalTracking: { name: 'External Tracking', selector: '#sb_external-tracking', default: true, group: 'Other Settings' },
      integrations: { name: 'Integrations', selector: '#sb_integrations', default: true, group: 'Other Settings' },
      privateIntegrations: { name: 'Private Integrations', selector: '[id="sb_common.sidebar.privateIntegrations"]', default: true, group: 'Other Settings' },
      tags: { name: 'Tags', selector: '#sb_tags', default: true, group: 'Other Settings' },
      labs: { name: 'Labs', selector: '#sb_labs', default: true, group: 'Other Settings' },
      auditLogs: { name: 'Audit Logs', selector: '#sb_audit-logs-location', default: true, group: 'Other Settings' },
      brandBoards: { name: 'Brand Boards', selector: '#sb_brand-boards', default: true, group: 'Other Settings' }
    },

    // UI Elements Configuration
    // These are elements within pages that can be hidden (tabs, buttons, etc.)
    // Uses text matching OR direct selector when data attributes are available
    uiElements: {
      // Phone System page tabs
      regulatoryBundles: {
        name: 'Regulatory Bundles Tab',
        containerSelector: '.hl_affiliate--nav',
        matchText: 'Regulatory Bundles',
        default: true,
        group: 'Phone System'
      },
      // Calendar Settings tabs
      calendarServiceMenu: {
        name: 'Service Menu Tab',
        selector: '[data-name="services"].n-tabs-tab',
        default: true,
        group: 'Calendar Settings'
      },
      calendarRooms: {
        name: 'Rooms Tab',
        selector: '[data-name="rooms"].n-tabs-tab',
        default: true,
        group: 'Calendar Settings'
      },
      calendarEquipment: {
        name: 'Equipment Tab',
        selector: '[data-name="equipments"].n-tabs-tab',
        default: true,
        group: 'Calendar Settings'
      },
      // Email Services tabs
      emailSmtpService: {
        name: 'SMTP Service Tab',
        selector: '[data-name="smtpServices"].n-tabs-tab',
        default: true,
        group: 'Email Services'
      },
      emailRiskAssessment: {
        name: 'Risk Assessment Tab',
        selector: '[data-name="riskAssessment"].n-tabs-tab',
        default: true,
        group: 'Email Services'
      },
      emailBounceClassification: {
        name: 'Bounce Classification Tab',
        selector: '[data-name="bounceClassification"].n-tabs-tab',
        default: true,
        group: 'Email Services'
      },
      emailPostmasterTools: {
        name: 'Postmaster Tools Tab',
        selector: '[data-name="postmasterTools"].n-tabs-tab',
        default: true,
        group: 'Email Services'
      }
    },

    // Storage Keys
    storageKeys: {
      theme: 'qurio-theme-preference',
      menuVisibility: 'qurio-menu-visibility',
      settingsMenuVisibility: 'qurio-settings-menu-visibility',
      uiElementsVisibility: 'qurio-ui-elements-visibility'
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
    // Get or create style element, ensuring it's attached to the DOM
    let styleEl = document.getElementById('qurio-menu-visibility-styles');

    // Check if element exists AND is attached to the DOM
    if (!styleEl || !styleEl.parentElement) {
      if (styleEl) styleEl.remove();
      styleEl = document.createElement('style');
      styleEl.id = 'qurio-menu-visibility-styles';
      const target = document.head || document.documentElement;
      if (target) target.appendChild(styleEl);
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
  // SETTINGS MENU VISIBILITY MANAGEMENT
  // ============================================

  function getSettingsMenuVisibility() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKeys.settingsMenuVisibility);
      if (stored) {
        const parsed = JSON.parse(stored);
        log('Retrieved settings menu visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access settings menu visibility from localStorage:', e);
    }

    // Return defaults
    const defaults = {};
    Object.keys(CONFIG.settingsMenuItems).forEach(key => {
      defaults[key] = CONFIG.settingsMenuItems[key].default;
    });
    log('Using default settings menu visibility');
    return defaults;
  }

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

  function applySettingsMenuVisibility(visibility) {
    // Get or create style element, ensuring it's attached to the DOM
    let styleEl = document.getElementById('qurio-settings-menu-visibility-styles');

    // Check if element exists AND is attached to the DOM
    if (!styleEl || !styleEl.parentElement) {
      if (styleEl) styleEl.remove();
      styleEl = document.createElement('style');
      styleEl.id = 'qurio-settings-menu-visibility-styles';
      const target = document.head || document.documentElement;
      if (target) target.appendChild(styleEl);
    }

    // Build CSS rules for hidden items
    let css = '';
    Object.keys(visibility).forEach(key => {
      if (!visibility[key] && CONFIG.settingsMenuItems[key]) {
        const item = CONFIG.settingsMenuItems[key];
        // High specificity selectors to override theme styles
        css += `html #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
        css += `html:not([data-ql-theme="none"]) #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
        css += `html body #sidebar-v2 nav ${item.selector} { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }\n`;
      }
    });

    styleEl.textContent = css;
    log('Applied settings menu visibility CSS');

    // Also apply via direct DOM manipulation as a fallback
    Object.keys(visibility).forEach(key => {
      if (CONFIG.settingsMenuItems[key]) {
        const item = CONFIG.settingsMenuItems[key];
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
          log('Could not apply settings visibility to', key, e);
        }
      }
    });
  }

  function setSettingsMenuItemVisibility(itemKey, visible) {
    const visibility = getSettingsMenuVisibility();
    visibility[itemKey] = visible;
    saveSettingsMenuVisibility(visibility);
    applySettingsMenuVisibility(visibility);

    // Update toggle in UI if exists
    const toggle = document.querySelector(`#qurio-settings-panel [data-settings-menu-item="${itemKey}"]`);
    if (toggle) {
      toggle.checked = visible;
    }

    const event = new CustomEvent('ql-settings-menu-visibility-changed', {
      detail: { item: itemKey, visible: visible, visibility: visibility }
    });
    window.dispatchEvent(event);
  }

  // ============================================
  // UI ELEMENTS VISIBILITY MANAGEMENT
  // For page elements like tabs, buttons that need text matching
  // ============================================

  function getUIElementsVisibility() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKeys.uiElementsVisibility);
      if (stored) {
        const parsed = JSON.parse(stored);
        log('Retrieved UI elements visibility from storage:', parsed);
        return parsed;
      }
    } catch (e) {
      log('Could not access UI elements visibility from localStorage:', e);
    }

    // Return defaults
    const defaults = {};
    Object.keys(CONFIG.uiElements).forEach(key => {
      defaults[key] = CONFIG.uiElements[key].default;
    });
    log('Using default UI elements visibility');
    return defaults;
  }

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

  function applyUIElementsVisibility(visibility) {
    // Get or create style element, ensuring it's attached to the DOM
    let styleEl = document.getElementById('qurio-ui-elements-visibility-styles');

    // Check if element exists AND is attached to the DOM
    if (!styleEl || !styleEl.parentElement) {
      // Remove detached element if it exists
      if (styleEl) {
        styleEl.remove();
      }
      // Create new element
      styleEl = document.createElement('style');
      styleEl.id = 'qurio-ui-elements-visibility-styles';

      // Append to head, with fallback to documentElement
      const target = document.head || document.documentElement;
      if (target) {
        target.appendChild(styleEl);
        log('Created and attached UI elements style element to', target.tagName);
      } else {
        log('ERROR: Could not find head or documentElement to attach styles');
        return;
      }
    }

    // Build CSS rules for selector-based items
    let css = '';

    Object.keys(CONFIG.uiElements).forEach(key => {
      const item = CONFIG.uiElements[key];
      const shouldShow = visibility[key] !== false;

      try {
        // Approach 1: CSS-based hiding for items with selector (preferred)
        if (item.selector && !shouldShow) {
          // Hide both the element and its wrapper
          css += `${item.selector} { display: none !important; visibility: hidden !important; }\n`;
          css += `.n-tabs-tab-wrapper:has(${item.selector}) { display: none !important; visibility: hidden !important; }\n`;
        }
        // Approach 2: JavaScript DOM manipulation for text-matching items
        else if (item.containerSelector && item.matchText) {
          const containers = document.querySelectorAll(item.containerSelector);
          containers.forEach(container => {
            // Find all links/items within the container
            const items = container.querySelectorAll('li, a, button, [role="tab"]');
            items.forEach(el => {
              // Check if text content matches
              const text = el.textContent.trim();
              if (text === item.matchText) {
                // Found the element - get the parent li if this is an anchor
                const targetEl = el.tagName === 'A' ? el.closest('li') || el : el;
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
    log('Applied UI elements visibility CSS:', css);
  }

  function setUIElementVisibility(itemKey, visible) {
    const visibility = getUIElementsVisibility();
    visibility[itemKey] = visible;
    saveUIElementsVisibility(visibility);
    applyUIElementsVisibility(visibility);

    // Update toggle in UI if exists
    const toggle = document.querySelector(`#qurio-settings-panel [data-ui-element="${itemKey}"]`);
    if (toggle) {
      toggle.checked = visible;
    }

    const event = new CustomEvent('ql-ui-element-visibility-changed', {
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
    const settingsMenuVisibility = getSettingsMenuVisibility();

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

    // Build settings menu toggles HTML (grouped by section)
    let settingsMenuTogglesHTML = '';
    let currentGroup = '';
    Object.keys(CONFIG.settingsMenuItems).forEach(itemKey => {
      const item = CONFIG.settingsMenuItems[itemKey];
      const isVisible = settingsMenuVisibility[itemKey] !== false;

      // Add group header if group changed
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        settingsMenuTogglesHTML += `
          <div class="qs-toggle-group-header">${item.group}</div>
        `;
      }

      settingsMenuTogglesHTML += `
        <label class="qs-toggle-row">
          <span class="qs-toggle-label">${item.name}</span>
          <div class="qs-toggle-switch">
            <input type="checkbox" data-settings-menu-item="${itemKey}" ${isVisible ? 'checked' : ''}>
            <span class="qs-toggle-slider"></span>
          </div>
        </label>
      `;
    });

    // Build UI elements toggles HTML (grouped by section)
    const uiElementsVisibility = getUIElementsVisibility();
    let uiElementsTogglesHTML = '';
    let currentUIGroup = '';
    Object.keys(CONFIG.uiElements).forEach(itemKey => {
      const item = CONFIG.uiElements[itemKey];
      const isVisible = uiElementsVisibility[itemKey] !== false;

      // Add group header if group changed
      if (item.group !== currentUIGroup) {
        currentUIGroup = item.group;
        uiElementsTogglesHTML += `
          <div class="qs-toggle-group-header">${item.group}</div>
        `;
      }

      uiElementsTogglesHTML += `
        <label class="qs-toggle-row">
          <span class="qs-toggle-label">${item.name}</span>
          <div class="qs-toggle-switch">
            <input type="checkbox" data-ui-element="${itemKey}" ${isVisible ? 'checked' : ''}>
            <span class="qs-toggle-slider"></span>
          </div>
        </label>
      `;
    });

    const container = document.createElement('div');
    container.id = 'qurio-settings-panel';

    container.innerHTML = `
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
              <span class="qs-section-title">Main Menu</span>
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

          <!-- Settings Menu Visibility Section -->
          <div class="qs-section" data-section="settings-menu">
            <div class="qs-section-header">
              <span class="qs-section-title">Settings Menu</span>
              <svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <div class="qs-section-content">
              <div class="qs-section-inner">
                <div class="qs-bulk-actions">
                  <button class="qs-bulk-btn" data-action="show-all-settings">Show All</button>
                  <button class="qs-bulk-btn" data-action="hide-all-settings">Hide All</button>
                </div>
                <div class="qs-toggles-list">
                  ${settingsMenuTogglesHTML}
                </div>
              </div>
            </div>
          </div>

          <!-- UI Elements Visibility Section -->
          <div class="qs-section" data-section="ui-elements">
            <div class="qs-section-header">
              <span class="qs-section-title">Interface Elements</span>
              <svg class="qs-section-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <div class="qs-section-content">
              <div class="qs-section-inner">
                <div class="qs-bulk-actions">
                  <button class="qs-bulk-btn" data-action="show-all-ui">Show All</button>
                  <button class="qs-bulk-btn" data-action="hide-all-ui">Hide All</button>
                </div>
                <div class="qs-toggles-list">
                  ${uiElementsTogglesHTML}
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

    // Main menu toggles
    container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(toggle => {
      toggle.addEventListener('change', () => {
        const itemKey = toggle.getAttribute('data-menu-item');
        setMenuItemVisibility(itemKey, toggle.checked);
      });
    });

    // Settings menu toggles
    container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(toggle => {
      toggle.addEventListener('change', () => {
        const itemKey = toggle.getAttribute('data-settings-menu-item');
        setSettingsMenuItemVisibility(itemKey, toggle.checked);
      });
    });

    // Main menu bulk actions
    container.querySelector('[data-action="show-all"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.menuItems).forEach(key => {
        visibility[key] = true;
      });
      saveMenuVisibility(visibility);
      applyMenuVisibility(visibility);

      // Update main menu toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(toggle => {
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

      // Update main menu toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-menu-item]').forEach(toggle => {
        toggle.checked = false;
      });
    });

    // Settings menu bulk actions
    container.querySelector('[data-action="show-all-settings"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.settingsMenuItems).forEach(key => {
        visibility[key] = true;
      });
      saveSettingsMenuVisibility(visibility);
      applySettingsMenuVisibility(visibility);

      // Update settings menu toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(toggle => {
        toggle.checked = true;
      });
    });

    container.querySelector('[data-action="hide-all-settings"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.settingsMenuItems).forEach(key => {
        visibility[key] = false;
      });
      saveSettingsMenuVisibility(visibility);
      applySettingsMenuVisibility(visibility);

      // Update settings menu toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-settings-menu-item]').forEach(toggle => {
        toggle.checked = false;
      });
    });

    // UI elements toggles
    container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(toggle => {
      toggle.addEventListener('change', () => {
        const itemKey = toggle.getAttribute('data-ui-element');
        setUIElementVisibility(itemKey, toggle.checked);
      });
    });

    // UI elements bulk actions
    container.querySelector('[data-action="show-all-ui"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.uiElements).forEach(key => {
        visibility[key] = true;
      });
      saveUIElementsVisibility(visibility);
      applyUIElementsVisibility(visibility);

      // Update UI element toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(toggle => {
        toggle.checked = true;
      });
    });

    container.querySelector('[data-action="hide-all-ui"]').addEventListener('click', () => {
      const visibility = {};
      Object.keys(CONFIG.uiElements).forEach(key => {
        visibility[key] = false;
      });
      saveUIElementsVisibility(visibility);
      applyUIElementsVisibility(visibility);

      // Update UI element toggles only
      container.querySelectorAll('.qs-toggle-switch input[data-ui-element]').forEach(toggle => {
        toggle.checked = false;
      });
    });

    log('Settings panel created');
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    log('Initializing Qurio Settings Panel v3.7.0...');

    // Apply saved theme immediately
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme, false);

    // Apply saved visibility settings (main menu, settings menu, UI elements)
    const menuVisibility = getMenuVisibility();
    applyMenuVisibility(menuVisibility);
    const settingsMenuVisibility = getSettingsMenuVisibility();
    applySettingsMenuVisibility(settingsMenuVisibility);
    const uiElementsVisibility = getUIElementsVisibility();
    applyUIElementsVisibility(uiElementsVisibility);

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
        // Re-apply all visibility settings
        const visibility = getMenuVisibility();
        applyMenuVisibility(visibility);
        const settingsVisibility = getSettingsMenuVisibility();
        applySettingsMenuVisibility(settingsVisibility);
        const uiVisibility = getUIElementsVisibility();
        applyUIElementsVisibility(uiVisibility);
      }, 100);
    };

    // Observe the sidebar for changes
    const sidebarObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          debouncedApply();
          break;
        }
      }
    });

    // Separate observer for body/content to catch UI elements like tabs
    const contentObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain elements we care about
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) { // Element node
              // Look for tab navigations or nav elements
              if (node.matches && (
                node.matches('.n-tabs-nav, .hl_affiliate--nav, [class*="tabs"], [class*="nav"]') ||
                node.querySelector('.n-tabs-nav, .hl_affiliate--nav, [class*="tabs"]')
              )) {
                debouncedApply();
                break;
              }
            }
          }
        }
      }
    });

    // Start observing when sidebar exists
    const startObserving = () => {
      const sidebar = document.getElementById('sidebar-v2');
      if (sidebar) {
        sidebarObserver.observe(sidebar, { childList: true, subtree: true });
        log('Sidebar observer started');
      } else {
        // Sidebar not found, try again shortly
        setTimeout(startObserving, 500);
      }

      // Observe document body for all content changes (catches SPA navigation)
      contentObserver.observe(document.body, { childList: true, subtree: true });
      log('Body content observer started');

      // Re-apply immediately in case we missed initial load
      debouncedApply();
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

    // Main menu visibility methods
    getMenuVisibility: getMenuVisibility,
    setMenuItemVisibility: setMenuItemVisibility,
    menuItems: CONFIG.menuItems,

    // Settings menu visibility methods
    getSettingsMenuVisibility: getSettingsMenuVisibility,
    setSettingsMenuItemVisibility: setSettingsMenuItemVisibility,
    settingsMenuItems: CONFIG.settingsMenuItems,

    // UI elements visibility methods
    getUIElementsVisibility: getUIElementsVisibility,
    setUIElementVisibility: setUIElementVisibility,
    uiElements: CONFIG.uiElements,

    // Config
    config: CONFIG,
    version: '3.7.0',

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
    onSettingsMenuChange: function(callback) {
      window.addEventListener('ql-settings-menu-visibility-changed', (e) => {
        callback(e.detail.item, e.detail.visible, e.detail.visibility);
      });
    },
    onUIElementChange: function(callback) {
      window.addEventListener('ql-ui-element-visibility-changed', (e) => {
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
