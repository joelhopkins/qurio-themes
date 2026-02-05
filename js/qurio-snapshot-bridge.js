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
            'https://qurio.hd.pics',
            // Add localhost for development
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8000',
        ],

        // Origins allowed for modal URLs (can be same as above or more restrictive)
        allowedModalOrigins: [
            'https://qurio.hd.pics',
            'https://docs.qurio.com',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8000',
        ],

        // Message type identifier (must match iframe app)
        messageType: 'QURIO_SNAPSHOT',

        // Enable debug logging
        debug: true,

        // Modal configuration
        modal: {
            // Predefined size options
            sizes: {
                small: '400px',
                medium: '600px',
                large: '900px',
                full: '95vw',
            },
            // Default size if not specified
            defaultSize: 'medium',
            // Max height for modal content area
            maxHeight: '85vh',
            // Timeout for modal ready signal (ms) - safety net fallback
            readyTimeout: 3000,
            // Allow closing by clicking backdrop
            closeOnBackdropClick: true,
            // Allow closing with Escape key
            closeOnEscape: true,
            // Z-index for modal overlay
            zIndex: 999999,
        },

        // Slideout configuration
        slideout: {
            // Default width
            defaultWidth: '400px',
            // Timeout for slideout ready signal (ms) - safety net fallback
            readyTimeout: 3000,
            // Allow closing by clicking backdrop
            closeOnBackdropClick: true,
            // Allow closing with Escape key
            closeOnEscape: true,
            // Z-index for slideout overlay
            zIndex: 999998,
        },
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

        // =====================================================================
        // MODAL ACTIONS
        // =====================================================================

        /**
         * Open a modal with iframe content.
         * @param {object} payload
         * @param {string} payload.url - URL to load in the modal
         * @param {string} payload.requestId - Unique ID for callback matching
         * @param {string} [payload.title] - Modal title
         * @param {string|number} [payload.size] - 'small', 'medium', 'large', 'full', or width value
         * @param {string|number} [payload.height] - Specific height
         * @param {boolean} [payload.showFooterClose] - Show close button in footer
         * @param {string} [payload.closeButtonText] - Custom close button text
         * @param {boolean} [payload.closeOnBackdropClick] - Close on backdrop click
         * @param {boolean} [payload.closeOnEscape] - Close on Escape key
         * @param {boolean} [payload.skipReady] - Show immediately on load (for third-party pages)
         * @param {string} _action - Action name (unused)
         * @param {string} sourceOrigin - Origin of the requesting iframe
         */
        OPEN_MODAL: function(payload, _action, sourceOrigin) {
            log('OPEN_MODAL triggered:', payload);
            return openModal(payload, sourceOrigin);
        },

        /**
         * Close the current modal (can be called from the requesting iframe).
         * @param {object} payload
         * @param {string} [payload.result] - Result type ('submit', 'cancel', etc.)
         * @param {object} [payload.data] - Data to return
         */
        CLOSE_MODAL: function(payload) {
            log('CLOSE_MODAL triggered:', payload);
            closeModal(payload.result || 'close', payload.data);
            return { success: true };
        },

        /**
         * Signal that modal content is ready (called from modal iframe).
         */
        MODAL_READY: function(payload) {
            log('MODAL_READY triggered:', payload);
            handleModalReady();
            return { success: true };
        },

        /**
         * Close modal with result (called from modal iframe).
         * @param {object} payload
         * @param {string} [payload.result] - Result type
         * @param {object} [payload.data] - Data to return
         */
        MODAL_CLOSE: function(payload) {
            log('MODAL_CLOSE triggered:', payload);
            closeModal(payload.result || 'close', payload.data);
            return { success: true };
        },

        /**
         * Resize the modal (called from modal iframe).
         * @param {object} payload
         * @param {string|number} [payload.width] - New width
         * @param {string|number} [payload.height] - New height
         */
        MODAL_RESIZE: function(payload) {
            log('MODAL_RESIZE triggered:', payload);
            handleModalResize(payload);
            return { success: true };
        },

        // =====================================================================
        // SLIDEOUT ACTIONS
        // =====================================================================

        /**
         * Open a slideout panel with iframe content.
         * @param {object} payload
         * @param {string} payload.url - URL to load in the slideout
         * @param {string} payload.requestId - Unique ID for callback matching
         * @param {string} [payload.title] - Slideout title
         * @param {string} [payload.subtitle] - Slideout subtitle
         * @param {string|number} [payload.width] - Custom width (default: 400px)
         * @param {boolean} [payload.closeOnBackdropClick] - Close on backdrop click
         * @param {boolean} [payload.closeOnEscape] - Close on Escape key
         * @param {boolean} [payload.skipReady] - Show immediately on load
         * @param {string} _action - Action name (unused)
         * @param {string} sourceOrigin - Origin of the requesting iframe
         */
        OPEN_SLIDEOUT: function(payload, _action, sourceOrigin) {
            log('OPEN_SLIDEOUT triggered:', payload);
            return openSlideout(payload, sourceOrigin);
        },

        /**
         * Close the current slideout (can be called from any iframe).
         * @param {object} payload
         * @param {string} [payload.result] - Result type ('submit', 'cancel', etc.)
         * @param {object} [payload.data] - Data to return
         */
        CLOSE_SLIDEOUT: function(payload) {
            log('CLOSE_SLIDEOUT triggered:', payload);
            closeSlideout(payload.result || 'close', payload.data);
            return { success: true };
        },

        /**
         * Signal that slideout content is ready (called from slideout iframe).
         */
        SLIDEOUT_READY: function(payload) {
            log('SLIDEOUT_READY triggered:', payload);
            handleSlideoutReady();
            return { success: true };
        },

        /**
         * Close slideout with result (called from slideout iframe).
         * @param {object} payload
         * @param {string} [payload.result] - Result type
         * @param {object} [payload.data] - Data to return
         */
        SLIDEOUT_CLOSE: function(payload) {
            log('SLIDEOUT_CLOSE triggered:', payload);
            closeSlideout(payload.result || 'close', payload.data);
            return { success: true };
        },
    };

    // =========================================================================
    // MODAL STATE
    // =========================================================================

    const modalState = {
        isOpen: false,
        currentModal: null,
        currentRequestId: null,
        readyTimeout: null,
        sourceOrigin: null,  // Origin of the iframe that requested the modal
    };

    // =========================================================================
    // SLIDEOUT STATE
    // =========================================================================

    const slideoutState = {
        isOpen: false,
        currentSlideout: null,
        currentRequestId: null,
        readyTimeout: null,
        sourceOrigin: null,
        iframe: null,
        loading: null,
        escapeHandler: null,
    };

    // =========================================================================
    // MODAL FUNCTIONS
    // =========================================================================

    /**
     * Parse the size parameter into a CSS width value.
     * @param {string|number} size - 'small', 'medium', 'large', 'full', or a specific value
     * @returns {string} CSS width value
     */
    function parseModalSize(size) {
        if (!size) {
            return CONFIG.modal.sizes[CONFIG.modal.defaultSize];
        }

        // Check if it's a predefined size
        if (CONFIG.modal.sizes[size]) {
            return CONFIG.modal.sizes[size];
        }

        // If it's a number, assume pixels
        if (typeof size === 'number') {
            return size + 'px';
        }

        // If it's a string with units, use as-is
        if (typeof size === 'string' && /^\d+(\.\d+)?(px|%|vw|em|rem)$/.test(size)) {
            return size;
        }

        // Fallback to default
        warn('Invalid modal size:', size, '- using default');
        return CONFIG.modal.sizes[CONFIG.modal.defaultSize];
    }

    /**
     * Validate that a URL is from an allowed origin.
     * @param {string} url - The URL to validate
     * @returns {boolean}
     */
    function isAllowedModalUrl(url) {
        try {
            const urlObj = new URL(url);
            return CONFIG.allowedModalOrigins.some(function(origin) {
                return urlObj.origin === origin || urlObj.origin === new URL(origin).origin;
            });
        } catch (e) {
            error('Invalid modal URL:', url);
            return false;
        }
    }

    /**
     * Create and inject modal styles if not already present.
     */
    function ensureModalStyles() {
        if (document.getElementById('qurio-modal-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'qurio-modal-styles';
        styles.textContent = `
            .qurio-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: ${CONFIG.modal.zIndex};
                opacity: 0;
                transition: opacity 0.2s ease-out;
                padding: 20px;
                box-sizing: border-box;
            }

            .qurio-modal-overlay.qurio-modal-visible {
                opacity: 1;
            }

            .qurio-modal-container {
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                max-height: ${CONFIG.modal.maxHeight};
                max-width: 100%;
                transform: scale(0.95) translateY(-10px);
                transition: transform 0.2s ease-out;
                overflow: hidden;
            }

            .qurio-modal-overlay.qurio-modal-visible .qurio-modal-container {
                transform: scale(1) translateY(0);
            }

            .qurio-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                border-bottom: 1px solid #e5e7eb;
                background: #f9fafb;
                flex-shrink: 0;
            }

            .qurio-modal-title {
                font-size: 16px;
                font-weight: 600;
                color: #111827;
                margin: 0;
            }

            .qurio-modal-close-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                color: #6b7280;
                transition: background-color 0.15s, color 0.15s;
            }

            .qurio-modal-close-btn:hover {
                background: #e5e7eb;
                color: #111827;
            }

            .qurio-modal-close-btn svg {
                width: 20px;
                height: 20px;
            }

            .qurio-modal-body {
                flex: 1;
                overflow: hidden;
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .qurio-modal-iframe {
                width: 100%;
                height: 100%;
                min-height: 200px;
                border: none;
                flex: 1;
            }

            .qurio-modal-loading {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff;
            }

            .qurio-modal-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #e5e7eb;
                border-top-color: #3b82f6;
                border-radius: 50%;
                animation: qurio-spin 0.8s linear infinite;
            }

            @keyframes qurio-spin {
                to { transform: rotate(360deg); }
            }

            .qurio-modal-error {
                text-align: center;
                padding: 40px 20px;
                color: #6b7280;
            }

            .qurio-modal-error-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }

            .qurio-modal-footer {
                padding: 12px 16px;
                border-top: 1px solid #e5e7eb;
                background: #f9fafb;
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                flex-shrink: 0;
            }

            .qurio-modal-footer-btn {
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.15s;
            }

            .qurio-modal-footer-btn-close {
                background: #6b7280;
                border: none;
                color: #fff;
            }

            .qurio-modal-footer-btn-close:hover {
                background: #4b5563;
            }

            /* Size variants */
            .qurio-modal-size-full .qurio-modal-container {
                width: 95vw;
                height: 90vh;
            }

            .qurio-modal-size-full .qurio-modal-iframe {
                min-height: unset;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Open a modal with an iframe.
     * @param {object} options
     * @param {string} options.url - URL to load in the modal iframe
     * @param {string} options.requestId - Unique ID for callback matching
     * @param {string} [options.title] - Modal title (optional)
     * @param {string|number} [options.size] - 'small', 'medium', 'large', 'full', or specific width
     * @param {string|number} [options.height] - Specific height (optional, defaults to auto/content)
     * @param {boolean} [options.showFooterClose] - Show a close button in the footer
     * @param {string} [options.closeButtonText] - Text for footer close button
     * @param {boolean} [options.closeOnBackdropClick] - Override default backdrop click behavior
     * @param {boolean} [options.closeOnEscape] - Override default escape key behavior
     * @param {boolean} [options.skipReady] - Show iframe immediately on load (skip waiting for MODAL_READY)
     * @param {string} sourceOrigin - Origin of the requesting iframe
     * @returns {object} Result object
     */
    function openModal(options, sourceOrigin) {
        const skipReady = options.skipReady === true;
        if (modalState.isOpen) {
            warn('Modal already open, ignoring request');
            return { success: false, error: 'Modal already open' };
        }

        // Validate URL
        if (!options.url) {
            return { success: false, error: 'No URL provided' };
        }

        if (!isAllowedModalUrl(options.url)) {
            error('Modal URL not in allowed origins:', options.url);
            return { success: false, error: 'URL not allowed' };
        }

        ensureModalStyles();

        const size = parseModalSize(options.size);
        const isFullSize = options.size === 'full';

        // Create modal elements
        const overlay = document.createElement('div');
        overlay.className = 'qurio-modal-overlay' + (isFullSize ? ' qurio-modal-size-full' : '');
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        if (options.title) {
            overlay.setAttribute('aria-label', options.title);
        }

        const container = document.createElement('div');
        container.className = 'qurio-modal-container';
        container.style.width = size;
        if (options.height) {
            const height = typeof options.height === 'number' ? options.height + 'px' : options.height;
            container.style.height = height;
        }

        // Header
        const header = document.createElement('div');
        header.className = 'qurio-modal-header';

        const title = document.createElement('h2');
        title.className = 'qurio-modal-title';
        title.textContent = options.title || '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'qurio-modal-close-btn';
        closeBtn.setAttribute('aria-label', 'Close modal');
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>';
        closeBtn.addEventListener('click', function() {
            closeModal('cancel');
        });

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Body
        const body = document.createElement('div');
        body.className = 'qurio-modal-body';

        // Loading indicator
        const loading = document.createElement('div');
        loading.className = 'qurio-modal-loading';
        loading.innerHTML = '<div class="qurio-modal-spinner"></div>';

        // Iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'qurio-modal-iframe';
        iframe.style.opacity = '0';
        iframe.src = options.url;

        body.appendChild(loading);
        body.appendChild(iframe);

        // Footer (optional)
        if (options.showFooterClose) {
            const footer = document.createElement('div');
            footer.className = 'qurio-modal-footer';

            const footerCloseBtn = document.createElement('button');
            footerCloseBtn.className = 'qurio-modal-footer-btn qurio-modal-footer-btn-close';
            footerCloseBtn.textContent = options.closeButtonText || 'Close';
            footerCloseBtn.addEventListener('click', function() {
                closeModal('close');
            });

            footer.appendChild(footerCloseBtn);
            container.appendChild(header);
            container.appendChild(body);
            container.appendChild(footer);
        } else {
            container.appendChild(header);
            container.appendChild(body);
        }

        overlay.appendChild(container);

        // Event handlers
        const shouldCloseOnBackdrop = options.closeOnBackdropClick !== undefined
            ? options.closeOnBackdropClick
            : CONFIG.modal.closeOnBackdropClick;

        if (shouldCloseOnBackdrop) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeModal('cancel');
                }
            });
        }

        const shouldCloseOnEscape = options.closeOnEscape !== undefined
            ? options.closeOnEscape
            : CONFIG.modal.closeOnEscape;

        if (shouldCloseOnEscape) {
            modalState.escapeHandler = function(e) {
                if (e.key === 'Escape' && modalState.isOpen) {
                    closeModal('cancel');
                }
            };
            document.addEventListener('keydown', modalState.escapeHandler);
        }

        // Handle iframe load - always show content when iframe finishes loading.
        // If the page sends MODAL_READY before load (via qurio-modal-helper.js),
        // the spinner hides even earlier. The timeout is a safety net only.
        iframe.addEventListener('load', function() {
            log('Modal iframe loaded');
            if (loading.style.display !== 'none') {
                log('Showing iframe on load event');
                loading.style.display = 'none';
                iframe.style.opacity = '1';
                if (modalState.readyTimeout) {
                    clearTimeout(modalState.readyTimeout);
                    modalState.readyTimeout = null;
                }
            }
        });

        iframe.addEventListener('error', function() {
            error('Modal iframe failed to load');
            loading.innerHTML = '<div class="qurio-modal-error"><div class="qurio-modal-error-icon">⚠️</div><div>Failed to load content</div></div>';
        });

        // Safety net timeout in case load event doesn't fire
        modalState.readyTimeout = setTimeout(function() {
            if (modalState.isOpen && loading.parentNode) {
                warn('Modal ready timeout - showing iframe anyway');
                loading.style.display = 'none';
                iframe.style.opacity = '1';
            }
        }, CONFIG.modal.readyTimeout);

        // Add to DOM
        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(function() {
            overlay.classList.add('qurio-modal-visible');
        });

        // Update state
        modalState.isOpen = true;
        modalState.currentModal = overlay;
        modalState.currentRequestId = options.requestId;
        modalState.sourceOrigin = sourceOrigin;
        modalState.iframe = iframe;
        modalState.loading = loading;

        // Focus management - focus the close button
        closeBtn.focus();

        log('Modal opened:', options);
        return { success: true };
    }

    /**
     * Close the current modal.
     * @param {string} result - 'submit', 'cancel', 'close', or custom result
     * @param {object} [data] - Optional data to return
     */
    function closeModal(result, data) {
        if (!modalState.isOpen || !modalState.currentModal) {
            return;
        }

        log('Closing modal with result:', result, data);

        // Clear timeout
        if (modalState.readyTimeout) {
            clearTimeout(modalState.readyTimeout);
            modalState.readyTimeout = null;
        }

        // Remove escape handler
        if (modalState.escapeHandler) {
            document.removeEventListener('keydown', modalState.escapeHandler);
            modalState.escapeHandler = null;
        }

        const overlay = modalState.currentModal;
        const requestId = modalState.currentRequestId;
        const sourceOrigin = modalState.sourceOrigin;

        // Animate out
        overlay.classList.remove('qurio-modal-visible');

        // Send result back to the requesting iframe
        if (requestId) {
            const response = {
                type: 'QURIO_MODAL_RESULT',
                requestId: requestId,
                result: result || 'close',
                data: data || null,
                timestamp: Date.now(),
            };

            // Send to all iframes (the requesting one will match by requestId)
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(function(frame) {
                // Don't send to the modal iframe itself
                if (frame === modalState.iframe) return;

                try {
                    frame.contentWindow.postMessage(response, '*');
                } catch (e) {
                    // Ignore cross-origin errors
                }
            });

            log('Sent modal result:', response);
        }

        // Remove from DOM after animation
        setTimeout(function() {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 200);

        // Reset state
        modalState.isOpen = false;
        modalState.currentModal = null;
        modalState.currentRequestId = null;
        modalState.sourceOrigin = null;
        modalState.iframe = null;
        modalState.loading = null;
    }

    /**
     * Handle modal ready signal from iframe.
     */
    function handleModalReady() {
        if (modalState.isOpen && modalState.loading && modalState.iframe) {
            log('Modal content ready');
            if (modalState.readyTimeout) {
                clearTimeout(modalState.readyTimeout);
                modalState.readyTimeout = null;
            }
            modalState.loading.style.display = 'none';
            modalState.iframe.style.opacity = '1';
        }
    }

    /**
     * Handle modal resize request from iframe.
     * @param {object} options - { width, height }
     */
    function handleModalResize(options) {
        if (modalState.isOpen && modalState.currentModal) {
            const container = modalState.currentModal.querySelector('.qurio-modal-container');
            if (container) {
                if (options.width) {
                    container.style.width = parseModalSize(options.width);
                }
                if (options.height) {
                    const height = typeof options.height === 'number' ? options.height + 'px' : options.height;
                    container.style.height = height;
                }
                log('Modal resized:', options);
            }
        }
    }

    // =========================================================================
    // SLIDEOUT FUNCTIONS
    // =========================================================================

    /**
     * Create and inject slideout styles if not already present.
     */
    function ensureSlideoutStyles() {
        if (document.getElementById('qurio-slideout-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'qurio-slideout-styles';
        styles.textContent = `
            .qurio-slideout-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: ${CONFIG.slideout.zIndex};
                opacity: 0;
                transition: opacity 0.3s ease-out;
            }

            .qurio-slideout-overlay.qurio-slideout-visible {
                opacity: 1;
            }

            .qurio-slideout-panel {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                background: #fff;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                z-index: ${CONFIG.slideout.zIndex + 1};
                transform: translateX(100%);
                transition: transform 0.3s ease-out;
            }

            .qurio-slideout-overlay.qurio-slideout-visible .qurio-slideout-panel {
                transform: translateX(0);
            }

            .qurio-slideout-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
                background: #f9fafb;
                flex-shrink: 0;
            }

            .qurio-slideout-header-content {
                flex: 1;
                min-width: 0;
            }

            .qurio-slideout-title {
                font-size: 18px;
                font-weight: 600;
                color: #111827;
                margin: 0;
                line-height: 1.3;
            }

            .qurio-slideout-subtitle {
                font-size: 13px;
                color: #6b7280;
                margin: 4px 0 0 0;
                line-height: 1.4;
            }

            .qurio-slideout-close-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                color: #6b7280;
                transition: background-color 0.15s, color 0.15s;
                margin-left: 12px;
                flex-shrink: 0;
            }

            .qurio-slideout-close-btn:hover {
                background: #e5e7eb;
                color: #111827;
            }

            .qurio-slideout-close-btn svg {
                width: 20px;
                height: 20px;
            }

            .qurio-slideout-body {
                flex: 1;
                overflow: hidden;
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .qurio-slideout-iframe {
                width: 100%;
                height: 100%;
                border: none;
                flex: 1;
            }

            .qurio-slideout-loading {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff;
            }

            .qurio-slideout-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #e5e7eb;
                border-top-color: #3b82f6;
                border-radius: 50%;
                animation: qurio-slideout-spin 0.8s linear infinite;
            }

            @keyframes qurio-slideout-spin {
                to { transform: rotate(360deg); }
            }

            .qurio-slideout-error {
                text-align: center;
                padding: 40px 20px;
                color: #6b7280;
            }

            .qurio-slideout-error-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Open a slideout panel with an iframe.
     * @param {object} options
     * @param {string} options.url - URL to load in the slideout iframe
     * @param {string} options.requestId - Unique ID for callback matching
     * @param {string} [options.title] - Slideout title
     * @param {string} [options.subtitle] - Slideout subtitle
     * @param {string|number} [options.width] - Custom width (default: 400px)
     * @param {boolean} [options.closeOnBackdropClick] - Override default backdrop click behavior
     * @param {boolean} [options.closeOnEscape] - Override default escape key behavior
     * @param {boolean} [options.skipReady] - Show iframe immediately on load
     * @param {string} sourceOrigin - Origin of the requesting iframe
     * @returns {object} Result object
     */
    function openSlideout(options, sourceOrigin) {
        const skipReady = options.skipReady === true;

        if (slideoutState.isOpen) {
            warn('Slideout already open, ignoring request');
            return { success: false, error: 'Slideout already open' };
        }

        // Validate URL
        if (!options.url) {
            return { success: false, error: 'No URL provided' };
        }

        if (!isAllowedModalUrl(options.url)) {
            error('Slideout URL not in allowed origins:', options.url);
            return { success: false, error: 'URL not allowed' };
        }

        ensureSlideoutStyles();

        // Parse width
        let width = CONFIG.slideout.defaultWidth;
        if (options.width) {
            if (typeof options.width === 'number') {
                width = options.width + 'px';
            } else if (typeof options.width === 'string') {
                width = options.width;
            }
        }

        // Create slideout elements
        const overlay = document.createElement('div');
        overlay.className = 'qurio-slideout-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        if (options.title) {
            overlay.setAttribute('aria-label', options.title);
        }

        const panel = document.createElement('div');
        panel.className = 'qurio-slideout-panel';
        panel.style.width = width;

        // Header
        const header = document.createElement('div');
        header.className = 'qurio-slideout-header';

        const headerContent = document.createElement('div');
        headerContent.className = 'qurio-slideout-header-content';

        if (options.title) {
            const title = document.createElement('h2');
            title.className = 'qurio-slideout-title';
            title.textContent = options.title;
            headerContent.appendChild(title);
        }

        if (options.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.className = 'qurio-slideout-subtitle';
            subtitle.textContent = options.subtitle;
            headerContent.appendChild(subtitle);
        }

        const closeBtn = document.createElement('button');
        closeBtn.className = 'qurio-slideout-close-btn';
        closeBtn.setAttribute('aria-label', 'Close slideout');
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>';
        closeBtn.addEventListener('click', function() {
            closeSlideout('cancel');
        });

        header.appendChild(headerContent);
        header.appendChild(closeBtn);

        // Body
        const body = document.createElement('div');
        body.className = 'qurio-slideout-body';

        // Loading indicator
        const loading = document.createElement('div');
        loading.className = 'qurio-slideout-loading';
        loading.innerHTML = '<div class="qurio-slideout-spinner"></div>';

        // Iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'qurio-slideout-iframe';
        iframe.style.opacity = '0';
        iframe.src = options.url;

        body.appendChild(loading);
        body.appendChild(iframe);

        panel.appendChild(header);
        panel.appendChild(body);
        overlay.appendChild(panel);

        // Event handlers - backdrop click
        const shouldCloseOnBackdrop = options.closeOnBackdropClick !== undefined
            ? options.closeOnBackdropClick
            : CONFIG.slideout.closeOnBackdropClick;

        if (shouldCloseOnBackdrop) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeSlideout('cancel');
                }
            });
        }

        // Escape key handler
        const shouldCloseOnEscape = options.closeOnEscape !== undefined
            ? options.closeOnEscape
            : CONFIG.slideout.closeOnEscape;

        if (shouldCloseOnEscape) {
            slideoutState.escapeHandler = function(e) {
                if (e.key === 'Escape' && slideoutState.isOpen) {
                    closeSlideout('cancel');
                }
            };
            document.addEventListener('keydown', slideoutState.escapeHandler);
        }

        // Handle iframe load - always show content when iframe finishes loading.
        // If the page sends SLIDEOUT_READY before load (via qurio-modal-helper.js),
        // the spinner hides even earlier. The timeout is a safety net only.
        iframe.addEventListener('load', function() {
            log('Slideout iframe loaded');
            if (loading.style.display !== 'none') {
                log('Showing slideout iframe on load event');
                loading.style.display = 'none';
                iframe.style.opacity = '1';
                if (slideoutState.readyTimeout) {
                    clearTimeout(slideoutState.readyTimeout);
                    slideoutState.readyTimeout = null;
                }
            }
        });

        iframe.addEventListener('error', function() {
            error('Slideout iframe failed to load');
            loading.innerHTML = '<div class="qurio-slideout-error"><div class="qurio-slideout-error-icon">⚠️</div><div>Failed to load content</div></div>';
        });

        // Safety net timeout in case load event doesn't fire
        slideoutState.readyTimeout = setTimeout(function() {
            if (slideoutState.isOpen && loading.parentNode) {
                warn('Slideout ready timeout - showing iframe anyway');
                loading.style.display = 'none';
                iframe.style.opacity = '1';
            }
        }, CONFIG.slideout.readyTimeout);

        // Add to DOM
        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(function() {
            overlay.classList.add('qurio-slideout-visible');
        });

        // Update state
        slideoutState.isOpen = true;
        slideoutState.currentSlideout = overlay;
        slideoutState.currentRequestId = options.requestId;
        slideoutState.sourceOrigin = sourceOrigin;
        slideoutState.iframe = iframe;
        slideoutState.loading = loading;

        // Focus management
        closeBtn.focus();

        log('Slideout opened:', options);
        return { success: true };
    }

    /**
     * Close the current slideout.
     * @param {string} result - 'submit', 'cancel', 'close', or custom result
     * @param {object} [data] - Optional data to return
     */
    function closeSlideout(result, data) {
        if (!slideoutState.isOpen || !slideoutState.currentSlideout) {
            return;
        }

        log('Closing slideout with result:', result, data);

        // Clear timeout
        if (slideoutState.readyTimeout) {
            clearTimeout(slideoutState.readyTimeout);
            slideoutState.readyTimeout = null;
        }

        // Remove escape handler
        if (slideoutState.escapeHandler) {
            document.removeEventListener('keydown', slideoutState.escapeHandler);
            slideoutState.escapeHandler = null;
        }

        const overlay = slideoutState.currentSlideout;
        const requestId = slideoutState.currentRequestId;

        // Animate out
        overlay.classList.remove('qurio-slideout-visible');

        // Send result back to the requesting iframe
        if (requestId) {
            const response = {
                type: 'QURIO_SLIDEOUT_RESULT',
                requestId: requestId,
                result: result || 'close',
                data: data || null,
                timestamp: Date.now(),
            };

            // Send to all iframes (the requesting one will match by requestId)
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(function(frame) {
                // Don't send to the slideout iframe itself
                if (frame === slideoutState.iframe) return;

                try {
                    frame.contentWindow.postMessage(response, '*');
                } catch (e) {
                    // Ignore cross-origin errors
                }
            });

            log('Sent slideout result:', response);
        }

        // Remove from DOM after animation
        setTimeout(function() {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);

        // Reset state
        slideoutState.isOpen = false;
        slideoutState.currentSlideout = null;
        slideoutState.currentRequestId = null;
        slideoutState.sourceOrigin = null;
        slideoutState.iframe = null;
        slideoutState.loading = null;
    }

    /**
     * Handle slideout ready signal from iframe.
     */
    function handleSlideoutReady() {
        if (slideoutState.isOpen && slideoutState.loading && slideoutState.iframe) {
            log('Slideout content ready');
            if (slideoutState.readyTimeout) {
                clearTimeout(slideoutState.readyTimeout);
                slideoutState.readyTimeout = null;
            }
            slideoutState.loading.style.display = 'none';
            slideoutState.iframe.style.opacity = '1';
        }
    }

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
            log('Navigating via $router:', normalizedPath);
            window.$router.push(normalizedPath);
            return;
        }

        // Method 2: If there's a global navigate function
        if (typeof window.navigateTo === 'function') {
            log('Navigating via window.navigateTo:', normalizedPath);
            window.navigateTo(normalizedPath);
            return;
        }

        // Method 3: Navigate via location (works reliably in HighLevel)
        log('Navigating via location:', normalizedPath);
        window.location.href = normalizedPath;
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
                // Pass sourceOrigin as third argument for handlers that need it (e.g., OPEN_MODAL)
                const result = handler(payload, action, event.origin);
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
            modalState: modalState,

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

            // Allow updating allowed modal origins
            addModalOrigin: function(origin) {
                if (!CONFIG.allowedModalOrigins.includes(origin)) {
                    CONFIG.allowedModalOrigins.push(origin);
                    log('Added allowed modal origin:', origin);
                }
            },

            // Open a modal programmatically (from parent context)
            openModal: function(options) {
                return openModal(options, window.location.origin);
            },

            // Close the current modal
            closeModal: closeModal,

            // Check if modal is open
            isModalOpen: function() {
                return modalState.isOpen;
            },

            // Slideout state
            slideoutState: slideoutState,

            // Open a slideout programmatically (from parent context)
            openSlideout: function(options) {
                return openSlideout(options, window.location.origin);
            },

            // Close the current slideout
            closeSlideout: closeSlideout,

            // Check if slideout is open
            isSlideoutOpen: function() {
                return slideoutState.isOpen;
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
