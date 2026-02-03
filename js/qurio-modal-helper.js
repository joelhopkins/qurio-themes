/**
 * Qurio Modal Helper
 *
 * This script should be included in pages that are loaded inside Qurio modals.
 * It provides a simple API to communicate with the parent bridge.
 *
 * INSTALLATION:
 * Add this script to your modal page:
 * <script src="https://your-domain.com/js/qurio-modal-helper.js"></script>
 *
 * USAGE:
 * // Signal that your modal content is ready (hides loading spinner)
 * QurioModal.ready();
 *
 * // Close the modal with a result
 * QurioModal.close('submit', { selectedItem: 'abc123' });
 * QurioModal.close('cancel');
 *
 * // Request modal resize
 * QurioModal.resize({ width: '800px', height: '600px' });
 *
 * // Submit shortcut (closes with 'submit' result)
 * QurioModal.submit({ formData: {...} });
 *
 * // Cancel shortcut (closes with 'cancel' result)
 * QurioModal.cancel();
 */

(function() {
    'use strict';

    const CONFIG = {
        // Message type identifier (must match parent bridge)
        messageType: 'QURIO_SNAPSHOT',

        // Target origin for postMessage (use '*' for any, or specify parent origin)
        targetOrigin: '*',

        // Enable debug logging
        debug: true,

        // Auto-signal ready after DOM load (set to false to manually call ready())
        autoReady: false,

        // Auto-ready delay in ms (gives your code time to initialize)
        autoReadyDelay: 100,
    };

    function log(...args) {
        if (CONFIG.debug) {
            console.log('[QurioModal]', ...args);
        }
    }

    /**
     * Send a message to the parent bridge.
     * @param {string} action - The action name
     * @param {object} [payload] - Optional payload data
     */
    function sendMessage(action, payload = {}) {
        if (!window.parent || window.parent === window) {
            log('Not in an iframe, message not sent:', action);
            return false;
        }

        const message = {
            type: CONFIG.messageType,
            action: action,
            payload: payload,
            timestamp: Date.now(),
        };

        log('Sending message:', message);
        window.parent.postMessage(message, CONFIG.targetOrigin);
        return true;
    }

    /**
     * Signal that the modal content is ready.
     * This hides the loading spinner in the parent.
     */
    function ready() {
        log('Signaling ready');
        return sendMessage('MODAL_READY');
    }

    /**
     * Close the modal with a result.
     * @param {string} [result='close'] - Result type ('submit', 'cancel', 'close', or custom)
     * @param {object} [data] - Optional data to pass back to the requesting iframe
     */
    function close(result = 'close', data = null) {
        log('Closing modal with result:', result, data);
        return sendMessage('MODAL_CLOSE', { result, data });
    }

    /**
     * Close the modal with 'submit' result.
     * @param {object} [data] - Data to pass back
     */
    function submit(data = null) {
        return close('submit', data);
    }

    /**
     * Close the modal with 'cancel' result.
     */
    function cancel() {
        return close('cancel');
    }

    /**
     * Request the modal to resize.
     * @param {object} options
     * @param {string|number} [options.width] - New width ('small', 'medium', 'large', 'full', or specific value)
     * @param {string|number} [options.height] - New height
     */
    function resize(options) {
        log('Requesting resize:', options);
        return sendMessage('MODAL_RESIZE', options);
    }

    /**
     * Check if we're running inside a modal (iframe with parent).
     * @returns {boolean}
     */
    function isInModal() {
        return window.parent && window.parent !== window;
    }

    /**
     * Get URL parameters passed to this modal page.
     * Useful for receiving context from the parent.
     * @returns {URLSearchParams}
     */
    function getParams() {
        return new URLSearchParams(window.location.search);
    }

    /**
     * Get a specific URL parameter.
     * @param {string} name - Parameter name
     * @param {*} [defaultValue] - Default value if not found
     * @returns {string|*}
     */
    function getParam(name, defaultValue = null) {
        const params = getParams();
        return params.has(name) ? params.get(name) : defaultValue;
    }

    // Auto-ready functionality
    function initAutoReady() {
        if (CONFIG.autoReady) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(ready, CONFIG.autoReadyDelay);
                });
            } else {
                setTimeout(ready, CONFIG.autoReadyDelay);
            }
        }
    }

    // Listen for escape key (optional - parent also handles this)
    function initEscapeHandler() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Let the parent handle it, but we could also handle it here
                // cancel();
            }
        });
    }

    // Initialize
    initAutoReady();
    initEscapeHandler();

    // Expose public API
    window.QurioModal = {
        // Configuration
        config: CONFIG,

        // Core methods
        sendMessage: sendMessage,
        ready: ready,
        close: close,
        submit: submit,
        cancel: cancel,
        resize: resize,

        // Utility methods
        isInModal: isInModal,
        getParams: getParams,
        getParam: getParam,

        // Allow configuration updates
        configure: function(options) {
            Object.assign(CONFIG, options);
            log('Configuration updated:', CONFIG);
        },
    };

    log('Initialized', isInModal() ? '(in modal)' : '(not in modal)');

})();
