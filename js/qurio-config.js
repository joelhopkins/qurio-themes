<script>
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

  console.log('[Qurio] Config loaded');

})();
</script>
