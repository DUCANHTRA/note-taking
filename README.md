# 📝 Note-Taking Application

A full-stack note-taking application with AI-powered suggestions, built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 📝 **Note Management** - Create, read, update, and delete notes
- 🏷️ **Tag System** - Organize notes with tags and filter by tags
- 🤖 **AI Suggestions** - Get AI-powered suggestions using Google Gemini
- 🚪 **Logout Functionality** - Secure logout with confirmation dialog
- 💾 **Persistent Storage** - User sessions persist across browser sessions

### Advanced Features
- 🔍 **Feature-Level Debug Tags** - Comprehensive logging with timestamps
- 📊 **Error Handling** - Detailed error tracking and reporting
- 🎨 **Color-Coded Logs** - Easy-to-read console output
- 🔄 **Request/Response Tracking** - Complete API call monitoring
- 🛡️ **Protected Routes** - Authentication middleware for secure endpoints
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Axios** - HTTP client
- **TailwindCSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Google Gemini AI** - AI suggestions

## 📁 Project Structure

```
note-taking/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── api/                # API service layer
│   │   │   ├── authApi.js      # Authentication API calls
│   │   │   ├── noteApi.js      # Note API calls
│   │   │   ├── aiApi.js        # AI API calls
│   │   │   └── axios.js        # Axios instance with interceptors
│   │   ├── components/         # React components
│   │   │   ├── auth/           # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── notes/          # Note components
│   │   │       ├── NotesPage.jsx
│   │   │       ├── NoteCard.jsx
│   │   │       ├── NoteEditor.jsx
│   │   │       └── AISuggestions.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useAuth.js      # Authentication hook
│   │   │   ├── useNotes.js     # Notes hook
│   │   │   └── useAISuggestions.js
│   │   ├── store/              # Zustand store
│   │   │   └── store.js        # Global state management
│   │   ├── utils/              # Utility functions
│   │   │   └── logger.js       # Frontend logger
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   └── package.json
│
├── server/                      # Backend Node.js application
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   └── noteController.js   # Note CRUD logic
│   ├── middleware/             # Express middleware
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/                 # Mongoose models
│   │   ├── User.js             # User schema
│   │   └── Note.js             # Note schema
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Auth routes
│   │   └── note.js             # Note routes
│   ├── services/               # Business logic
│   │   └── geminiService.js    # AI service
│   ├── utils/                  # Utility functions
│   │   └── logger.js           # Backend logger
│   ├── server.js               # Entry point
│   └── package.json
│
├── ERROR_HANDLING_GUIDE.md     # Error handling documentation
├── DEBUG_TAGS_REFERENCE.md     # Debug tags quick reference
├── LOGGING_FLOW_GUIDE.md       # Logging flow visualization
├── IMPLEMENTATION_SUMMARY.md   # Implementation summary
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd note-taking
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Create `.env` file in the `client` directory (optional):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   node server.js
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Note Endpoints

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <token>

# With tag filter
GET /api/notes?tags=work,personal
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "tags": ["work", "important"]
}
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated"]
}
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <token>
```

#### Get AI Suggestions
```http
POST /api/notes/suggest
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content"
}
```

## 🔍 Feature-Level Debug Tags

This application includes comprehensive logging with feature-level debug tags for easy debugging and issue tracing.

### Available Tags
- `[AuthFeature]` - Authentication operations
- `[NoteFeature]` - Note CRUD operations
- `[AIFeature]` - AI suggestion operations
- `[APIRequest]` - Frontend API requests
- `[APIResponse]` - Frontend API responses

### Log Levels
- **INFO** - General information
- **SUCCESS** - Successful operations
- **WARN** - Warnings and validation failures
- **ERROR** - Errors and exceptions
- **DEBUG** - Development debugging (dev only)
- **ACTION** - User actions tracking

### Example Log Output

**Backend (Terminal):**
```
[2025-12-09T09:50:14.130Z] ACTION [AuthFeature] - Login attempt
{
  "email": "user@example.com"
}
[2025-12-09T09:50:14.200Z] SUCCESS [AuthFeature] - User logged in successfully
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

**Frontend (Browser Console):**
```
[2025-12-09T09:50:14.125Z] API REQUEST [APIRequest] - POST /auth/login
[2025-12-09T09:50:14.235Z] API RESPONSE [APIResponse] - POST /auth/login [200]
[2025-12-09T09:50:14.236Z] SUCCESS [AuthFeature] - User logged in successfully
```

For more details, see:
- [ERROR_HANDLING_GUIDE.md](./ERROR_HANDLING_GUIDE.md) - Complete error handling guide
- [DEBUG_TAGS_REFERENCE.md](./DEBUG_TAGS_REFERENCE.md) - Quick reference
- [LOGGING_FLOW_GUIDE.md](./LOGGING_FLOW_GUIDE.md) - Visual flow diagrams

## 🛠️ Development

### Frontend Development
```bash
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd server
node server.js       # Start server
# or use nodemon for auto-restart
nodemon server.js
```

### Debugging

1. **Frontend Logs**: Open browser console (F12)
2. **Backend Logs**: Check terminal output
3. **Filter by Tag**: Search for specific feature tags
4. **Follow Timestamps**: Track the sequence of events

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Middleware authentication
- **Input Validation** - Server-side validation
- **Error Handling** - No sensitive data in error messages
- **Auto-Logout** - On 401 unauthorized responses

## 🎨 UI Features

- **Responsive Design** - Mobile and desktop friendly
- **User Feedback** - Confirmation dialogs
- **Loading States** - Visual feedback during operations
- **Error Messages** - User-friendly error display
- **Tag Filtering** - Filter notes by tags
- **Logout Button** - Easy access in header with user email display

## 📝 Usage Guide

### Creating an Account
1. Click "Register" on the login page
2. Enter your email and password
3. Click "Register" to create your account
4. You'll be automatically logged in

### Managing Notes
1. **Create**: Fill in title, content, and tags, then click "Create Note"
2. **Edit**: Click on a note to edit it
3. **Delete**: Click the delete button on a note card
4. **Filter**: Use the tag filter input to filter notes by tags

### Using AI Suggestions
1. Create or edit a note
2. Click "Get AI Suggestions"
3. Review the AI-generated suggestions
4. Apply suggestions to your note

### Logging Out
1. Click the "Logout" button in the top-right corner
2. Confirm the logout action
3. You'll be redirected to the login page

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running
- Check port 5000 is not in use

### Frontend won't connect to backend
- Verify `VITE_API_URL` in client `.env`
- Ensure backend is running on correct port
- Check browser console for CORS errors

### AI suggestions not working
- Verify `GEMINI_API_KEY` in server `.env`
- Check Gemini API quota and limits
- Review backend logs for API errors

### Authentication issues
- Clear browser localStorage
- Check JWT_SECRET is set in server `.env`
- Verify token expiration (7 days default)

## 📊 Performance

- **Frontend**: Vite for fast HMR and optimized builds
- **Backend**: Express with efficient middleware
- **Database**: MongoDB with indexed queries
- **State**: Zustand for minimal re-renders
- **Caching**: LocalStorage for auth persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Mark Tran

## 🙏 Acknowledgments

- Google Gemini AI for AI suggestions
- MongoDB for database
- React team for the amazing library
- Vite for the blazing fast build tool

## 📞 Support

For issues and questions:
- Check the documentation files
- Review the logs with debug tags
- Open an issue on GitHub

