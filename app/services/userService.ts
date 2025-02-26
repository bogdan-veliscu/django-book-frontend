// Define interfaces locally to avoid import errors
interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

import apiClient from './apiClient';

export const loginUser = async (credentials: LoginData): Promise<User> => {
  try {
    console.log('Attempting to login with:', credentials.email);
    const response = await apiClient.post('/users/login', { user: credentials });
    console.log('Login response:', response.data);
    
    // Handle different response formats
    if (response.data.user) {
      return response.data.user;
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData: RegisterData): Promise<User> => {
  try {
    console.log('Attempting to register user:', userData.username);
    const response = await apiClient.post('/users', { user: userData });
    console.log('Register response:', response.data);
    
    // Handle different response formats
    if (response.data.user) {
      return response.data.user;
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get('/user');
    console.log('Current user response:', response.data);
    
    // Handle different response formats
    if (response.data.user) {
      return response.data.user;
    } else if (response.data && response.data.email) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  try {
    console.log('Updating user with data:', userData);
    const response = await apiClient.put('/user', { user: userData });
    console.log('Update user response:', response.data);
    
    // Handle different response formats
    if (response.data.user) {
      return response.data.user;
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error('Update user error:', error.response?.data || error.message);
    throw error;
  }
}; 