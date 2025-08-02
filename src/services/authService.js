// Authentication service for backend API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class AuthService {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Try to parse JSON error response
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || 'Login failed';
        } catch (parseError) {
          // If response is not JSON (e.g., HTML error page), use status-based message
          if (response.status === 401) {
            errorMessage = 'Invalid email or password';
          } else if (response.status === 404) {
            errorMessage = 'Login endpoint not found. Please check if your backend has the correct API route.';
          } else if (response.status === 403) {
            errorMessage = 'Access denied. Please check your credentials.';
          } else if (response.status === 422) {
            errorMessage = 'Invalid request data. Please check your email format.';
          } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (response.status >= 400 && response.status < 500) {
            errorMessage = 'Invalid request. Please check your credentials.';
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = `Login failed (Status: ${response.status})`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection and backend URL.');
      }
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Try to parse JSON error response
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || 'Registration failed';
        } catch (parseError) {
          // If response is not JSON (e.g., HTML error page), use status-based message
          if (response.status === 409) {
            errorMessage = 'User already exists with this email';
          } else if (response.status === 400) {
            errorMessage = 'Invalid registration data. Please check your information.';
          } else if (response.status === 404) {
            errorMessage = 'Registration endpoint not found. Please check if your backend has the correct API route.';
          } else if (response.status === 403) {
            errorMessage = 'Access denied. Please check your registration data.';
          } else if (response.status === 422) {
            errorMessage = 'Invalid request data. Please check your information.';
          } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (response.status >= 400 && response.status < 500) {
            errorMessage = 'Invalid request. Please check your registration data.';
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = `Registration failed (Status: ${response.status})`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection and backend URL.');
      }
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService(); 