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

// Get current timestamp function
const getTimestamp = () => {
    return new Date().toISOString();
};

// Format log function
const formatLog = (level, tag, message, data = null) => {
    const timestamp = getTimestamp(); // Get current timestamp
    const logData = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] ${level} ${tag} - ${message}${logData}`;
};

// Logger object
// Input: tag, message, data
// Format Function: [timestamp] level tag - message
// Output: log message
const logger = {
    //info level log
    info: (tag, message, data = null) => {
        console.log(
            `${colors.cyan}${formatLog('INFO', tag, message, data)}${colors.reset}`
        );
    },

    //success level log
    success: (tag, message, data = null) => {
        console.log(
            `${colors.green}${formatLog('SUCCESS', tag, message, data)}${colors.reset}`
        );
    },

    //warn level log
    warn: (tag, message, data = null) => {
        console.warn(
            `${colors.yellow}${formatLog('WARN', tag, message, data)}${colors.reset}`
        );
    },

    //error level log
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

    //debug level log
    debug: (tag, message, data = null) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(
                `${colors.magenta}${formatLog('DEBUG', tag, message, data)}${colors.reset}`
            );
        }
    },

    //action level log
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
