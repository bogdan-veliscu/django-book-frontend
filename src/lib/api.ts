import { mockApi } from './mockApi';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout and error handling
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 500,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Enhance error message with API response details
    if (error.response?.data) {
      error.message = error.response.data.detail || error.response.data.error || error.message;
    }
    
    return Promise.reject(error);
  }
);

export default api;

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    // Return mock data during build
    return { props: { articles: [] } };
  }
  // Real API call in development
  const res = await api.get('/articles');
  return { props: { articles: res.data } };
} 