    /**
    * QURIO CONFIG
    * Version: 4.0.0
    *
    * Configuration for Qurio theme system
    * Must be loaded first - other modules depend on this
    */

    (function() {
    'use strict';

    // Create namespace
    window.Qurio = window.Qurio || {};

    window.Qurio.CONFIG = {
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
    menuItems: {
    launchpad: { name: 'Launchpad', selector: '#sb_launchpad', default: false },
    dashboard: { name: 'Dashboard', selector: '#sb_dashboard', default: false },
    conversations: { name: 'Conversations', selector: '#sb_conversations', default: true },
    calendars: { name: 'Calendars', selector: '#sb_calendars', default: true },
    contacts: { name: 'Contacts', selector: '#sb_contacts', default: true },
    opportunities: { name: 'Opportunities', selector: '#sb_opportunities', default: false },
    payments: { name: 'Payments', selector: '#sb_payments', default: false },
    aiAgents: { name: 'AI Agents', selector: 'a[meta="AI Agents"]', default: false },
    marketing: { name: 'Marketing', selector: '#sb_email-marketing', default: true },
    automation: { name: 'Automation', selector: '#sb_automation', default: false },
    sites: { name: 'Sites', selector: '#sb_sites', default: true },
    memberships: { name: 'Memberships', selector: '#sb_memberships', default: false },
    mediaStorage: { name: 'Media Storage', selector: '#sb_app-media', default: true },
    reputation: { name: 'Reputation', selector: '#sb_reputation', default: true },
    reporting: { name: 'Reporting', selector: '#sb_reporting', default: true },
    appMarketplace: { name: 'App Marketplace', selector: '#sb_app-marketplace', default: false },
    qurioDocs: { name: 'Qurio Docs', selector: 'a.custom-link', default: true }
},

    // Settings Menu Items Configuration
    settingsMenuItems: {
    // MY BUSINESS
    businessProfile: { name: 'Business Profile', selector: '#sb_business_info', default: true, group: 'My Business' },
    myProfile: { name: 'My Profile', selector: '#sb_profile', default: true, group: 'My Business' },
    billing: { name: 'Billing', selector: '#sb_saas-billing', default: true, group: 'My Business' },
    myStaff: { name: 'My Staff', selector: '#sb_my-staff', default: true, group: 'My Business' },
    opportunitiesPipelines: { name: 'Opportunities & Pipelines', selector: '#sb_Opportunities-Pipelines', default: false, group: 'My Business' },
    // BUSINESS SERVICES
    settingsCalendars: { name: 'Calendars', selector: 'a[meta="calendars"][href*="settings"]', default: true, group: 'Business Services' },
    conversationAI: { name: 'Conversation AI', selector: '#sb_conversation_ai_settings_v2', default: false, group: 'Business Services' },
    voiceAIAgents: { name: 'Voice AI Agents', selector: '#sb_ai_agent_settings', default: false, group: 'Business Services' },
    emailServices: { name: 'Email Services', selector: '#sb_location-email-services', default: true, group: 'Business Services' },
    phoneSystem: { name: 'Phone System', selector: '#sb_phone-system', default: true, group: 'Business Services' },
    whatsapp: { name: 'WhatsApp', selector: '#sb_whatsapp', default: false, group: 'Business Services' },
    // OTHER SETTINGS
    objects: { name: 'Objects', selector: '#sb_objects', default: false, group: 'Other Settings' },
    customFields: { name: 'Custom Fields', selector: '#sb_custom-fields-settings', default: false, group: 'Other Settings' },
    customValues: { name: 'Custom Values', selector: '#sb_custom-values', default: false, group: 'Other Settings' },
    manageScoring: { name: 'Manage Scoring', selector: '#sb_manage-scoring', default: false, group: 'Other Settings' },
    domainsUrlRedirects: { name: 'Domains & URL Redirects', selector: '#sb_domains-urlRedirects', default: false, group: 'Other Settings' },
    externalTracking: { name: 'External Tracking', selector: '#sb_external-tracking', default: true, group: 'Other Settings' },
    integrations: { name: 'Integrations', selector: '#sb_integrations', default: true, group: 'Other Settings' },
    privateIntegrations: { name: 'Private Integrations', selector: '[id="sb_common.sidebar.privateIntegrations"]', default: false, group: 'Other Settings' },
    tags: { name: 'Tags', selector: '#sb_tags', default: true, group: 'Other Settings' },
    labs: { name: 'Labs', selector: '#sb_labs', default: false, group: 'Other Settings' },
    auditLogs: { name: 'Audit Logs', selector: '#sb_audit-logs-location', default: false, group: 'Other Settings' },
    brandBoards: { name: 'Brand Boards', selector: '#sb_brand-boards', default: false, group: 'Other Settings' }
},

    // UI Elements Configuration
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
    defaultTheme: 'none',
    showSettings: true,
    position: 'bottom-right',
    debug: false
};

    console.log('[Qurio] Config loaded');

})();

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

    // Always set the attribute - 'none' disables theme styles via CSS :not([data-ql-theme="none"])
    html.setAttribute('data-ql-theme', themeName);

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
    /**
    * QURIO UI ELEMENTS VISIBILITY
    * Version: 4.1.0
    *
    * UI elements visibility management (tabs, buttons, etc.)
    * Handles both main document and iframe content
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

    /**
     * Ensure style element exists in a document
     */
    function ensureStyleElementInDoc(doc, id) {
    if (!doc) return null;

    try {
    var styleEl = doc.getElementById(id);

    // Check if element exists AND is attached
    if (!styleEl || !styleEl.parentElement) {
    if (styleEl) {
    styleEl.remove();
}
    styleEl = doc.createElement('style');
    styleEl.id = id;

    var target = doc.head || doc.documentElement;
    if (target) {
    target.appendChild(styleEl);
} else {
    return null;
}
}

    return styleEl;
} catch (e) {
    // Cross-origin iframe or other access error
    return null;
}
}

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
     * Build CSS rules for hidden UI elements
     */
    function buildUIElementsCSS(visibility) {
    var css = '';

    Object.keys(CONFIG.uiElements).forEach(function(key) {
    var item = CONFIG.uiElements[key];
    var shouldShow = visibility[key] !== false;

    // Only add CSS for items with selector (not text-matching items)
    if (item.selector && !shouldShow) {
    css += item.selector + ' { display: none !important; visibility: hidden !important; }\n';
    css += '.n-tabs-tab-wrapper:has(' + item.selector + ') { display: none !important; visibility: hidden !important; }\n';
}
});

    return css;
}

    /**
     * Apply CSS to a specific document (main or iframe)
     */
    function applyCSSToDocs(visibility) {
    var css = buildUIElementsCSS(visibility);

    // Apply to main document
    var mainStyleEl = ensureStyleElementInDoc(document, 'qurio-ui-elements-visibility-styles');
    if (mainStyleEl) {
    mainStyleEl.textContent = css;
}

    // Find and apply to all iframes
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
    try {
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc) {
    var iframeStyleEl = ensureStyleElementInDoc(iframeDoc, 'qurio-ui-elements-visibility-styles');
    if (iframeStyleEl) {
    iframeStyleEl.textContent = css;
    log('Applied UI elements CSS to iframe');
}
}
} catch (e) {
    // Cross-origin iframe, can't access
    log('Could not access iframe (cross-origin?):', e.message);
}
});
}

    /**
     * Apply text-matching visibility (for items without selectors)
     */
    function applyTextMatchingVisibility(visibility, doc) {
    if (!doc) doc = document;

    Object.keys(CONFIG.uiElements).forEach(function(key) {
    var item = CONFIG.uiElements[key];
    var shouldShow = visibility[key] !== false;

    // Only process text-matching items
    if (item.containerSelector && item.matchText) {
    try {
    var containers = doc.querySelectorAll(item.containerSelector);
    containers.forEach(function(container) {
    var items = container.querySelectorAll('li, a, button, [role="tab"]');
    items.forEach(function(el) {
    var text = el.textContent.trim();
    if (text === item.matchText) {
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
} catch (e) {
    log('Could not apply text matching visibility to', key, e);
}
}
});
}

    /**
     * Apply UI elements visibility via CSS and DOM manipulation
     */
    function applyUIElementsVisibility(visibility) {
    // Apply CSS to main document and iframes
    applyCSSToDocs(visibility);

    // Apply text-matching items to main document
    applyTextMatchingVisibility(visibility, document);

    // Apply text-matching to iframes too
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
    try {
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc) {
    applyTextMatchingVisibility(visibility, iframeDoc);
}
} catch (e) {
    // Cross-origin iframe
}
});

    log('Applied UI elements visibility');
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

    /**
     * Watch for new iframes and apply styles to them
     */
    function setupIframeObserver() {
    var observer = new MutationObserver(function(mutations) {
    var hasNewIframe = false;

    mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
    mutation.addedNodes.forEach(function(node) {
    if (node.nodeType === 1) {
    if (node.tagName === 'IFRAME' || (node.querySelector && node.querySelector('iframe'))) {
    hasNewIframe = true;
}
}
});
}
});

    if (hasNewIframe) {
    // Wait a bit for iframe to load
    setTimeout(function() {
    var visibility = getUIElementsVisibility();
    applyUIElementsVisibility(visibility);
}, 500);
}
});

    observer.observe(document.body, { childList: true, subtree: true });
    log('Iframe observer started');
}

    // Setup iframe observer when DOM is ready
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupIframeObserver);
} else {
    setupIframeObserver();
}

    // Export UI elements visibility functions
    window.Qurio.uiElementsVisibility = {
    get: getUIElementsVisibility,
    save: saveUIElementsVisibility,
    apply: applyUIElementsVisibility,
    setItem: setUIElementVisibility
};

    console.log('[Qurio] UI elements visibility module loaded (v4.1.0 with iframe support)');

})();
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
    var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'none';

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
    var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'none';
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
    return window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'none';
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
    var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'none';
    var currentIndex = themes.indexOf(currentTheme);
    var nextIndex = (currentIndex + 1) % themes.length;
    if (window.Qurio.theme) {
    window.Qurio.theme.apply(themes[nextIndex]);
}
    return themes[nextIndex];
},
    prev: function() {
    var themes = Object.keys(CONFIG.themes);
    var currentTheme = window.Qurio.theme ? window.Qurio.theme.getCurrent() : 'none';
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
