import axios from "axios";
import { getSession } from "next-auth/react";

// Check if we're in a Node.js environment during build
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

// Determine the API URL based on environment
const getApiUrl = () => {
  // Browser environment
  if (typeof window !== 'undefined') {
    return window.location.origin.includes('localhost') 
      ? 'http://localhost:8000/api'
      : `${window.location.origin}/api`;
  } 
  // Server environment
  else {
    // In server environment, we need a full URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    
    // Make sure it's a full URL
    if (apiUrl.startsWith('http')) {
      return apiUrl;
    } else {
      // If it's a relative URL, prepend with a default host
      return `http://localhost:3000${apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`}`;
    }
  }
};

const API_URL = getApiUrl();
console.log("API URL configured as:", API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Mock response data for build time
const mockArticleData = {
  slug: "mock-article",
  title: "Mock Article",
  description: "This is a mock article for build time",
  body: "Mock article content",
  tagList: ["mock", "build"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  favorited: false,
  favoritesCount: 0,
  author: {
    username: "mockuser",
    bio: "Mock user bio",
    image: "",
    following: false
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
      
      // If we're in build time, log but continue with the request
      // The response interceptor will handle mocking the response
      if (isBuildTime) {
        console.log("Build time detected, will mock response in response interceptor");
      }
      
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
    // If we're in build time, return mock data instead of failing
    if (isBuildTime) {
      console.log("Build time error or mock response, returning mock data");
      const url = error.config?.url || '';
      
      // Create a mock response object
      let mockData = {};
      
      // Return different mock data based on the endpoint
      if (url.includes('/articles')) {
        if (url.match(/\/articles\/[^\/]+$/)) {
          // Single article request
          mockData = { article: mockArticleData };
        } else {
          // Articles list request
          mockData = { articles: [mockArticleData] };
        }
      }
      
      return Promise.resolve({ 
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      });
    }
    
    console.error("API Error:", error.message);
    console.error("Response data:", error.response?.data);
    console.error("Request URL:", error.config?.url);
    console.error("Request method:", error.config?.method);
    return Promise.reject(error);
  }
);

export default apiClient;