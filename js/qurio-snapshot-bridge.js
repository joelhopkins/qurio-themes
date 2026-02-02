/**
 * Qurio Snapshot Parent Bridge
 *
 * This script should be added to the HighLevel/Qurio parent window.
 * It listens for postMessage events from the Qurio Snapshot iframe
 * and triggers the appropriate native actions.
 *
 * INSTALLATION:
 * 1. Add this script to your HighLevel custom code section
 * 2. Configure ALLOWED_IFRAME_ORIGINS with your Snapshot app URL
 * 3. Customize the action handlers to match your HighLevel implementation
 *
 * Usage in HighLevel Custom Code:
 * Add script tag with src="https://your-snapshot-domain.com/js/qurio-snapshot-bridge.js"
 *
 * Or inline the minified version directly.
 */

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURATION - Update these for your environment
    // =========================================================================

    const CONFIG = {
        // Origins allowed to send messages (your Snapshot app URLs)
        allowedOrigins: [
            'https://docs.qurio.com',
            // Add localhost for development
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8000',
        ],

        // Message type identifier (must match iframe app)
        messageType: 'QURIO_SNAPSHOT',

        // Enable debug logging
        debug: true,
    };

    // =========================================================================
    // LOGGING
    // =========================================================================

    function log(...args) {
        if (CONFIG.debug) {
            console.log('[QurioSnapshotBridge]', ...args);
        }
    }

    function warn(...args) {
        console.warn('[QurioSnapshotBridge]', ...args);
    }

    function error(...args) {
        console.error('[QurioSnapshotBridge]', ...args);
    }

    // =========================================================================
    // ACTION HANDLERS
    // =========================================================================

    /**
     * Action handlers map.
     * Each handler receives the payload and should trigger the appropriate
     * HighLevel native functionality.
     *
     * CUSTOMIZE THESE for your specific HighLevel integration!
     */
    const actionHandlers = {

        /**
         * Log a call for a contact.
         * @param {object} payload - { contactId, contactName }
         */
        LOG_CALL: function(payload) {
            log('LOG_CALL triggered:', payload);

            // Option 1: If HighLevel has a global function
            if (typeof window.openLogCallModal === 'function') {
                window.openLogCallModal(payload.contactId);
                return { success: true };
            }

            // Option 2: Trigger a custom event that HighLevel listens for
            window.dispatchEvent(new CustomEvent('qurio:logCall', {
                detail: payload
            }));

            // Option 3: Navigate to the contact with call modal
            if (payload.contactId) {
                navigateToContact(payload.contactId, 'call');
                return { success: true };
            }

            return { success: false, error: 'No contact specified' };
        },

        /**
         * Open email composer.
         * @param {object} payload - { contactId, contactEmail, subject, body }
         */
        SEND_EMAIL: function(payload) {
            log('SEND_EMAIL triggered:', payload);

            // Option 1: If HighLevel has a global function
            if (typeof window.openEmailComposer === 'function') {
                window.openEmailComposer(payload);
                return { success: true };
            }

            // Option 2: Trigger custom event
            window.dispatchEvent(new CustomEvent('qurio:sendEmail', {
                detail: payload
            }));

            // Option 3: Navigate to contact with email action
            if (payload.contactId) {
                navigateToContact(payload.contactId, 'email');
                return { success: true };
            }

            return { success: false, error: 'Could not open email composer' };
        },

        /**
         * Open SMS composer.
         * @param {object} payload - { contactId, contactPhone, message }
         */
        SEND_SMS: function(payload) {
            log('SEND_SMS triggered:', payload);

            window.dispatchEvent(new CustomEvent('qurio:sendSMS', {
                detail: payload
            }));

            if (payload.contactId) {
                navigateToContact(payload.contactId, 'sms');
                return { success: true };
            }

            return { success: false, error: 'No contact specified' };
        },

        /**
         * Open a contact's profile.
         * @param {object} payload - { contactId }
         */
        OPEN_CONTACT: function(payload) {
            log('OPEN_CONTACT triggered:', payload);

            if (payload.contactId) {
                navigateToContact(payload.contactId);
                return { success: true };
            }

            return { success: false, error: 'No contact ID provided' };
        },

        /**
         * Open add task modal.
         * @param {object} payload - { title, contactId, dueDate }
         */
        ADD_TASK: function(payload) {
            log('ADD_TASK triggered:', payload);

            // Option 1: If HighLevel has a global function
            if (typeof window.openAddTaskModal === 'function') {
                window.openAddTaskModal(payload);
                return { success: true };
            }

            // Option 2: Trigger custom event
            window.dispatchEvent(new CustomEvent('qurio:addTask', {
                detail: payload
            }));

            return { success: true };
        },

        /**
         * Open the calendar.
         * @param {object} payload - { date }
         */
        OPEN_CALENDAR: function(payload) {
            log('OPEN_CALENDAR triggered:', payload);

            // Navigate to calendar page
            const calendarPath = payload.date
                ? `/calendar?date=${payload.date}`
                : '/calendar';

            navigateTo(calendarPath);
            return { success: true };
        },

        /**
         * Navigate to a path within HighLevel.
         * @param {object} payload - { path }
         */
        NAVIGATE: function(payload) {
            log('NAVIGATE triggered:', payload);

            if (payload.path) {
                navigateTo(payload.path);
                return { success: true };
            }

            return { success: false, error: 'No path provided' };
        },

        /**
         * Open conversation with a contact.
         * @param {object} payload - { contactId }
         */
        OPEN_CONVERSATION: function(payload) {
            log('OPEN_CONVERSATION triggered:', payload);

            if (payload.contactId) {
                navigateTo(`/conversations/${payload.contactId}`);
                return { success: true };
            }

            return { success: false, error: 'No contact ID provided' };
        },

        /**
         * Show a notification/toast.
         * @param {object} payload - { message, type }
         */
        SHOW_NOTIFICATION: function(payload) {
            log('SHOW_NOTIFICATION triggered:', payload);

            // Option 1: If HighLevel has a toast/notification system
            if (typeof window.showToast === 'function') {
                window.showToast(payload.message, payload.type);
                return { success: true };
            }

            // Option 2: Use a custom event
            window.dispatchEvent(new CustomEvent('qurio:notification', {
                detail: payload
            }));

            // Option 3: Fallback to browser notification
            if (Notification.permission === 'granted') {
                new Notification('Qurio Snapshot', {
                    body: payload.message,
                });
            }

            return { success: true };
        },

        /**
         * Request data refresh.
         * @param {object} payload - {}
         */
        REFRESH_DATA: function(payload) {
            log('REFRESH_DATA triggered:', payload);

            window.dispatchEvent(new CustomEvent('qurio:refreshData', {
                detail: payload
            }));

            return { success: true };
        },

        /**
         * Handle custom/unknown actions.
         * @param {object} payload - any
         * @param {string} action - The action name
         */
        CUSTOM: function(payload, action) {
            log('CUSTOM action triggered:', action, payload);

            window.dispatchEvent(new CustomEvent('qurio:customAction', {
                detail: { action, payload }
            }));

            return { success: true };
        },
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    /**
     * Navigate within HighLevel.
     * Tries multiple methods to handle different HighLevel routing implementations.
     */
    function navigateTo(path) {
        // Ensure path starts with /
        const normalizedPath = path.startsWith('/') ? path : '/' + path;

        // Method 1: If using Vue Router or React Router exposed globally
        if (window.$router && typeof window.$router.push === 'function') {
            window.$router.push(normalizedPath);
            return;
        }

        // Method 2: If there's a global navigate function
        if (typeof window.navigateTo === 'function') {
            window.navigateTo(normalizedPath);
            return;
        }

        // Method 3: Dispatch event for app to handle
        window.dispatchEvent(new CustomEvent('qurio:navigate', {
            detail: { path: normalizedPath }
        }));

        // Method 4: Fallback to window.location (causes full page reload)
        // window.location.href = normalizedPath;
    }

    /**
     * Navigate to a contact page with optional action.
     */
    function navigateToContact(contactId, action = null) {
        let path = `/contacts/${contactId}`;
        if (action) {
            path += `?action=${action}`;
        }
        navigateTo(path);
    }

    /**
     * Send a response back to the iframe.
     */
    function sendResponse(iframe, action, success, data = {}) {
        const response = {
            type: 'QURIO_PARENT_RESPONSE',
            action: action,
            success: success,
            data: data,
            timestamp: Date.now(),
        };

        // Find the iframe and send response
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(frame) {
            try {
                frame.contentWindow.postMessage(response, '*');
            } catch (e) {
                // Ignore cross-origin errors
            }
        });
    }

    // =========================================================================
    // MESSAGE HANDLER
    // =========================================================================

    function handleMessage(event) {
        // Validate origin
        if (!CONFIG.allowedOrigins.includes(event.origin)) {
            // Silently ignore messages from unknown origins
            return;
        }

        // Validate message structure
        const data = event.data;
        if (!data || data.type !== CONFIG.messageType) {
            return;
        }

        log('Received message:', data);

        const action = data.action;
        const payload = data.payload || {};

        // Find and execute handler
        const handler = actionHandlers[action];
        if (handler) {
            try {
                const result = handler(payload, action);
                sendResponse(event.source, action, result?.success !== false, result?.data);
            } catch (err) {
                error('Handler error:', err);
                sendResponse(event.source, action, false, { error: err.message });
            }
        } else {
            warn('Unknown action:', action);
            // Try custom handler as fallback
            actionHandlers.CUSTOM(payload, action);
        }
    }

    // =========================================================================
    // INITIALIZATION
    // =========================================================================

    function init() {
        // Debug: catch-all listener to see all incoming messages
        window.addEventListener('message', function(e) {
            console.log('RAW MESSAGE:', e.origin, e.data);
        });

        // Add message listener
        window.addEventListener('message', handleMessage, false);

        log('Initialized. Listening for messages from:', CONFIG.allowedOrigins);

        // Expose for debugging/customization
        window.QurioSnapshotBridge = {
            config: CONFIG,
            handlers: actionHandlers,

            // Allow adding custom handlers
            addHandler: function(action, handler) {
                actionHandlers[action] = handler;
                log('Added custom handler for:', action);
            },

            // Allow updating allowed origins
            addOrigin: function(origin) {
                if (!CONFIG.allowedOrigins.includes(origin)) {
                    CONFIG.allowedOrigins.push(origin);
                    log('Added allowed origin:', origin);
                }
            },
        };
    }

    // Run on DOM ready or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
