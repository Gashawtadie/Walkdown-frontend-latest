# Backend Integration Setup

This guide explains how to connect your frontend to your backend service for authentication.

## Environment Configuration

Create a `.env` file in your project root with the following content:

```env
# Backend API Configuration
# Replace with your actual backend URL
VITE_API_BASE_URL=http://localhost:3001/api

# Example for production
# VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Backend API Endpoints

Your backend should implement the following endpoints:

### 1. Login Endpoint
- **URL**: `POST /api/users/login`
- **Request Body**:
  ```json
  {
    "email": "user@siemens-energy.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "username",
      "firstName": "First",
      "lastName": "Last",
      "email": "user@siemens-energy.com"
    }
  }
  ```

### 2. Registration Endpoint
- **URL**: `POST /api/users/register`
- **Request Body**:
  ```json
  {
    "username": "username",
    "firstName": "First",
    "lastName": "Last",
    "email": "user@siemens-energy.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

## Features Implemented

### Authentication Service (`src/services/authService.js`)
- Login functionality with JWT token storage
- Registration functionality
- Token management (storage, retrieval, cleanup)
- Authentication state checking

### Updated Components

#### LoginScreen (`src/components/LoginScreen.jsx`)
- ✅ Backend API integration
- ✅ Loading states
- ✅ Error handling
- ✅ Email validation (Siemens Energy domain)
- ✅ Disabled form during submission

#### RegistrationScreen (`src/components/RegistrationScreen.jsx`)
- ✅ Backend API integration
- ✅ Loading states
- ✅ Error handling
- ✅ Email validation (Siemens Energy domain)
- ✅ Password confirmation validation
- ✅ Required field validation
- ✅ Disabled form during submission

#### App (`src/App.jsx`)
- ✅ Authentication state management
- ✅ Automatic login check on app load
- ✅ Proper logout functionality
- ✅ User session persistence

## Testing the Integration

1. Start your backend server
2. Create a `.env` file with your backend URL
3. Run the frontend: `npm run dev`
4. Test login and registration flows

## Error Handling

The application now includes comprehensive error handling:
- Network errors
- Authentication failures
- Validation errors
- User-friendly error messages

## Security Features

- JWT token storage in localStorage
- Automatic token cleanup on logout
- Email domain validation for Siemens Energy
- Password confirmation validation
- Form validation and sanitization 