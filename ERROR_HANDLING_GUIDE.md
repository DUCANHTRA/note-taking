# Feature-Level Debug Tags & Error Handling Documentation

## Overview
This document describes the comprehensive error handling and logging system implemented across the note-taking application with feature-level debug tags and timestamps.

## Feature Tags

### Backend Tags
- **[AuthFeature]** - Authentication operations (register, login, logout)
- **[NoteFeature]** - Note CRUD operations (create, read, update, delete)
- **[AIFeature]** - AI suggestion operations

### Frontend Tags
- **[AuthFeature]** - Authentication API calls
- **[NoteFeature]** - Note API calls
- **[AIFeature]** - AI suggestion API calls
- **[APIRequest]** - All outgoing API requests
- **[APIResponse]** - All API responses and errors

## Logger Utilities

### Backend Logger (`server/utils/logger.js`)
Color-coded console logging with the following methods:

```javascript
import logger from "../utils/logger.js";

// Information logging
logger.info('[FeatureTag]', 'Message', { data });

// Success logging
logger.success('[FeatureTag]', 'Message', { data });

// Warning logging
logger.warn('[FeatureTag]', 'Message', { data });

// Error logging
logger.error('[FeatureTag]', 'Message', error);

// Debug logging (only in development)
logger.debug('[FeatureTag]', 'Message', { data });

// Action logging (user actions)
logger.action('[FeatureTag]', 'Action name', userId, { data });
```

**Color Scheme:**
- INFO: Cyan
- SUCCESS: Green
- WARN: Yellow
- ERROR: Red
- DEBUG: Magenta
- ACTION: Blue

### Frontend Logger (`client/src/utils/logger.js`)
Browser console logging with styled output:

```javascript
import logger from "../utils/logger";

// Same methods as backend
logger.info('[FeatureTag]', 'Message', { data });
logger.success('[FeatureTag]', 'Message', { data });
logger.warn('[FeatureTag]', 'Message', { data });
logger.error('[FeatureTag]', 'Message', error);
logger.debug('[FeatureTag]', 'Message', { data });
logger.action('[FeatureTag]', 'Action name', { data });

// API-specific logging
logger.api.request('[Tag]', 'GET', '/api/notes', { data });
logger.api.response('[Tag]', 'GET', '/api/notes', 200, { data });
```

## Log Format

### Backend Log Format
```
[2025-12-09T09:50:14.123Z] LEVEL [FeatureTag] - Message
{
  "data": "additional context"
}
```

### Frontend Log Format
```
[2025-12-09T09:50:14.123Z] LEVEL [FeatureTag] - Message
```

## Implementation Examples

### Backend Controller Example

```javascript
import logger from "../utils/logger.js";

const TAG = "[AuthFeature]";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log user action
    logger.action(TAG, "Login attempt", null, { email });

    // Validation
    if (!email || !password) {
      logger.warn(TAG, "Login failed - Missing credentials", {
        email: !!email,
        password: !!password,
      });
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(TAG, "Login failed - User not found", { email });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success
    logger.success(TAG, "User logged in successfully", {
      userId: user._id,
      email: user.email,
    });

    res.json({ /* response */ });
  } catch (err) {
    logger.error(TAG, "Login error", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};
```

### Frontend API Example

```javascript
import logger from "../utils/logger";

const TAG = "[NoteFeature]";

export const createNote = async (data) => {
  try {
    logger.action(TAG, "Create note request", { title: data.title });
    const res = await axiosInstance.post("/notes", data);
    logger.success(TAG, "Note created successfully", { noteId: res.data._id });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to create note", error);
    throw error;
  }
};
```

## Error Handling Patterns

### Backend Error Handling

1. **Validation Errors** (400)
   - Log with `logger.warn()`
   - Include what fields are missing/invalid
   - Return user-friendly message

2. **Not Found Errors** (404)
   - Log with `logger.warn()`
   - Include resource ID and user ID
   - Return "Resource not found" message

3. **Server Errors** (500)
   - Log with `logger.error()`
   - Include full error stack
   - Return generic error message (don't expose internals)

### Frontend Error Handling

1. **API Errors**
   - Logged automatically by axios interceptors
   - Specific handling for 401, 403, 404, 500+ errors
   - Network errors logged separately

2. **401 Unauthorized**
   - Automatically clears auth storage
   - Reloads page to show login

3. **Network Errors**
   - Logged with "Network error - No response from server"
   - Includes request details

## Axios Interceptors

### Request Interceptor
- Adds authentication token
- Logs all outgoing requests with method, URL, and data
- Logs request errors

### Response Interceptor
- Logs all successful responses with status and data
- Logs all error responses with detailed information
- Handles specific error codes:
  - **401**: Clears auth and reloads
  - **403**: Logs forbidden access
  - **404**: Logs resource not found
  - **500+**: Logs server errors
  - **Network errors**: Logs connection issues

## Quick Issue Tracing

### To trace an issue:

1. **Identify the feature** - Look for the feature tag in logs
2. **Find the timestamp** - All logs include ISO timestamps
3. **Follow the flow** - Logs show the complete request/response cycle
4. **Check error details** - Error logs include stack traces and response data

### Example Log Sequence (Successful Login):

**Frontend:**
```
[2025-12-09T09:50:14.123Z] ACTION [AuthFeature] - Login user request
[2025-12-09T09:50:14.125Z] API REQUEST [APIRequest] - POST /auth/login
[2025-12-09T09:50:14.234Z] API RESPONSE [APIResponse] - POST /auth/login [200]
[2025-12-09T09:50:14.235Z] SUCCESS [AuthFeature] - User logged in successfully
```

**Backend:**
```
[2025-12-09T09:50:14.130Z] ACTION [AuthFeature] - Login attempt
[2025-12-09T09:50:14.200Z] SUCCESS [AuthFeature] - User logged in successfully
[2025-12-09T09:50:14.201Z] INFO [AuthFeature] - JWT token generated
```

### Example Log Sequence (Failed Login):

**Frontend:**
```
[2025-12-09T09:50:14.123Z] ACTION [AuthFeature] - Login user request
[2025-12-09T09:50:14.125Z] API REQUEST [APIRequest] - POST /auth/login
[2025-12-09T09:50:14.234Z] ERROR [APIResponse] - API Error: POST /auth/login [400]
[2025-12-09T09:50:14.235Z] ERROR [AuthFeature] - Login failed
```

**Backend:**
```
[2025-12-09T09:50:14.130Z] ACTION [AuthFeature] - Login attempt
[2025-12-09T09:50:14.150Z] WARN [AuthFeature] - Login failed - User not found
```

## Best Practices

1. **Always use feature tags** - Makes filtering logs easy
2. **Log user actions** - Use `logger.action()` for key user operations
3. **Include context** - Add relevant data (IDs, counts, etc.)
4. **Don't log sensitive data** - Never log passwords or tokens
5. **Use appropriate log levels** - info, warn, error, debug, action
6. **Log both success and failure** - Complete picture of operations
7. **Include timestamps** - Automatically added by logger
8. **Use structured data** - Pass objects for additional context

## Environment Considerations

- **Development**: All logs are shown including DEBUG level
- **Production**: DEBUG logs are suppressed, only INFO, WARN, ERROR, SUCCESS, ACTION are shown

## Monitoring Recommendations

1. Set up log aggregation (e.g., Winston, Loggly, Datadog)
2. Create alerts for ERROR level logs
3. Monitor ACTION logs for user behavior
4. Track API response times
5. Set up dashboards for feature-specific metrics
