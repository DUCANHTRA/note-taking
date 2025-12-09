// frontend/src/utils/logger.js

/**
 * Feature-level logger with timestamps and tags for frontend
 * Usage: logger.info('[AuthFeature]', 'User login attempt', { email })
 */

const isDevelopment = import.meta.env.MODE === 'development';

const getTimestamp = () => {
    return new Date().toISOString();
};

const formatLog = (level, tag, message, data = null) => {
    const timestamp = getTimestamp();
    return {
        timestamp,
        level,
        tag,
        message,
        ...(data && { data }),
    };
};

const logger = {
    info: (tag, message, data = null) => {
        const log = formatLog('INFO', tag, message, data);
        console.log(
            `%c[${log.timestamp}] INFO ${tag}%c - ${message}`,
            'color: #3b82f6; font-weight: bold',
            'color: inherit',
            data || ''
        );
    },

    success: (tag, message, data = null) => {
        const log = formatLog('SUCCESS', tag, message, data);
        console.log(
            `%c[${log.timestamp}] SUCCESS ${tag}%c - ${message}`,
            'color: #10b981; font-weight: bold',
            'color: inherit',
            data || ''
        );
    },

    warn: (tag, message, data = null) => {
        const log = formatLog('WARN', tag, message, data);
        console.warn(
            `%c[${log.timestamp}] WARN ${tag}%c - ${message}`,
            'color: #f59e0b; font-weight: bold',
            'color: inherit',
            data || ''
        );
    },

    error: (tag, message, error = null) => {
        const log = formatLog('ERROR', tag, message, error);
        const errorData = error
            ? {
                message: error.message,
                ...(error.response?.data && { response: error.response.data }),
                ...(error.response?.status && { status: error.response.status }),
            }
            : null;

        console.error(
            `%c[${log.timestamp}] ERROR ${tag}%c - ${message}`,
            'color: #ef4444; font-weight: bold',
            'color: inherit',
            errorData || ''
        );
    },

    debug: (tag, message, data = null) => {
        if (isDevelopment) {
            const log = formatLog('DEBUG', tag, message, data);
            console.log(
                `%c[${log.timestamp}] DEBUG ${tag}%c - ${message}`,
                'color: #8b5cf6; font-weight: bold',
                'color: inherit',
                data || ''
            );
        }
    },

    // Action logger for tracking key user actions
    action: (tag, action, data = null) => {
        const log = formatLog('ACTION', tag, action, data);
        console.log(
            `%c[${log.timestamp}] ACTION ${tag}%c - ${action}`,
            'color: #06b6d4; font-weight: bold',
            'color: inherit',
            data || ''
        );
    },

    // API call logger
    api: {
        request: (tag, method, url, data = null) => {
            if (isDevelopment) {
                console.log(
                    `%c[${getTimestamp()}] API REQUEST ${tag}%c - ${method.toUpperCase()} ${url}`,
                    'color: #0ea5e9; font-weight: bold',
                    'color: inherit',
                    data || ''
                );
            }
        },

        response: (tag, method, url, status, data = null) => {
            if (isDevelopment) {
                const color = status >= 200 && status < 300 ? '#10b981' : '#ef4444';
                console.log(
                    `%c[${getTimestamp()}] API RESPONSE ${tag}%c - ${method.toUpperCase()} ${url} [${status}]`,
                    `color: ${color}; font-weight: bold`,
                    'color: inherit',
                    data || ''
                );
            }
        },
    },
};

export default logger;
