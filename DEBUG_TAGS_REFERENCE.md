# Quick Reference: Feature-Level Debug Tags

## 🏷️ Feature Tags Reference

| Tag | Location | Purpose |
|-----|----------|---------|
| `[AuthFeature]` | Backend & Frontend | Authentication operations |
| `[NoteFeature]` | Backend & Frontend | Note CRUD operations |
| `[AIFeature]` | Backend & Frontend | AI suggestion operations |
| `[APIRequest]` | Frontend | Outgoing API requests |
| `[APIResponse]` | Frontend | API responses & errors |

## 📊 Log Levels

| Level | Method | Color | When to Use |
|-------|--------|-------|-------------|
| INFO | `logger.info()` | Cyan/Blue | General information |
| SUCCESS | `logger.success()` | Green | Successful operations |
| WARN | `logger.warn()` | Yellow | Warnings, validation failures |
| ERROR | `logger.error()` | Red | Errors, exceptions |
| DEBUG | `logger.debug()` | Magenta/Purple | Development debugging |
| ACTION | `logger.action()` | Blue/Cyan | User actions |

## 🔍 Common Log Patterns

### Backend
```javascript
// User action
logger.action('[AuthFeature]', 'Login attempt', userId, { email });

// Success
logger.success('[NoteFeature]', 'Note created', { noteId, userId });

// Warning
logger.warn('[AuthFeature]', 'Invalid credentials', { email });

// Error
logger.error('[NoteFeature]', 'Database error', error);
```

### Frontend
```javascript
// User action
logger.action('[AuthFeature]', 'Login request', { email });

// API request
logger.api.request('[APIRequest]', 'POST', '/auth/login', data);

// API response
logger.api.response('[APIResponse]', 'POST', '/auth/login', 200, data);

// Error
logger.error('[AuthFeature]', 'Login failed', error);
```

## 🚨 Error Status Codes

| Code | Meaning | Handling |
|------|---------|----------|
| 400 | Bad Request | Validation error, log with WARN |
| 401 | Unauthorized | Auto-logout, clear storage |
| 403 | Forbidden | Access denied, log with WARN |
| 404 | Not Found | Resource missing, log with WARN |
| 500+ | Server Error | Internal error, log with ERROR |

## 📝 Example Log Outputs

### Successful Login
```
Backend:
[2025-12-09T09:50:14.130Z] ACTION [AuthFeature] - Login attempt
{
  "email": "user@example.com"
}
[2025-12-09T09:50:14.200Z] SUCCESS [AuthFeature] - User logged in successfully
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}

Frontend:
[2025-12-09T09:50:14.123Z] ACTION [AuthFeature] - Login user request
[2025-12-09T09:50:14.234Z] SUCCESS [AuthFeature] - User logged in successfully
```

### Failed Note Creation
```
Backend:
[2025-12-09T09:50:14.130Z] ACTION [NoteFeature] - Create note
{
  "userId": "507f1f77bcf86cd799439011",
  "title": ""
}
[2025-12-09T09:50:14.135Z] WARN [NoteFeature] - Create note failed - Missing required fields
{
  "userId": "507f1f77bcf86cd799439011",
  "hasTitle": false,
  "hasContent": true
}

Frontend:
[2025-12-09T09:50:14.123Z] ACTION [NoteFeature] - Create note request
[2025-12-09T09:50:14.234Z] ERROR [NoteFeature] - Failed to create note
```

## 🛠️ Debugging Workflow

1. **Open Browser Console** (F12) for frontend logs
2. **Check Terminal** for backend logs
3. **Filter by Tag** - Search for `[FeatureTag]`
4. **Follow Timestamps** - Track the sequence of events
5. **Check Error Details** - Expand error objects for stack traces

## 💡 Tips

- **Frontend logs** are styled with colors in the browser console
- **Backend logs** use ANSI colors in the terminal
- **DEBUG logs** only show in development mode
- **All logs** include ISO 8601 timestamps
- **Error objects** include stack traces and response data
- **API interceptors** automatically log all requests/responses
