// backend/utils/logger.js

/**
 * Feature-level logger with timestamps and tags
 * Usage: logger.info('[AuthFeature]', 'User login attempt', { email })
 */

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

const getTimestamp = () => {
    return new Date().toISOString();
};

const formatLog = (level, tag, message, data = null) => {
    const timestamp = getTimestamp();
    const logData = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] ${level} ${tag} - ${message}${logData}`;
};

const logger = {
    info: (tag, message, data = null) => {
        console.log(
            `${colors.cyan}${formatLog('INFO', tag, message, data)}${colors.reset}`
        );
    },

    success: (tag, message, data = null) => {
        console.log(
            `${colors.green}${formatLog('SUCCESS', tag, message, data)}${colors.reset}`
        );
    },

    warn: (tag, message, data = null) => {
        console.warn(
            `${colors.yellow}${formatLog('WARN', tag, message, data)}${colors.reset}`
        );
    },

    error: (tag, message, error = null) => {
        const errorData = error
            ? {
                message: error.message,
                stack: error.stack,
                ...(error.response?.data && { response: error.response.data }),
            }
            : null;
        console.error(
            `${colors.red}${formatLog('ERROR', tag, message, errorData)}${colors.reset}`
        );
    },

    debug: (tag, message, data = null) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(
                `${colors.magenta}${formatLog('DEBUG', tag, message, data)}${colors.reset}`
            );
        }
    },

    // Action logger for tracking key user actions
    action: (tag, action, userId = null, data = null) => {
        const actionData = {
            action,
            userId,
            ...data,
        };
        console.log(
            `${colors.blue}${formatLog('ACTION', tag, action, actionData)}${colors.reset}`
        );
    },
};

export default logger;
