import axios from "axios";
import { getSession } from "next-auth/react";

// Determine the API URL based on environment
let API_URL;
if (typeof window !== 'undefined') {
  // Browser environment
  API_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000/api'
    : `${window.location.origin}/api`;
} else {
  // Server environment
  API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
}

console.log("API URL configured as:", API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

apiClient.interceptors.request.use(
  async (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    
    try {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Token ${session.accessToken}`;
        console.log("Request includes auth token");
      }
    } catch (error) {
      console.error("Error getting session:", error);
    }
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    console.error("Response data:", error.response?.data);
    console.error("Request URL:", error.config?.url);
    console.error("Request method:", error.config?.method);
    return Promise.reject(error);
  }
);

export default apiClient;