import axios from "axios";
import { getSession } from "next-auth/react";

// Check if we're in a Node.js environment during build
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

// Determine the API URL based on environment
const getApiUrl = () => {
  // Environment variable should take precedence
  if (process.env.NEXT_PUBLIC_API_URL) {
    console.log("Using API URL from environment variable:", process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Browser environment - use the current origin with /api path
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    console.log("Using browser origin for API URL:", `${origin}/api`);
    return `${origin}/api`;
  } 
  // Server environment - fallback
  else {
    console.log("Falling back to default API URL: /api");
    return '/api';
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

// Keep track of session fetch attempts to prevent infinite loops
let sessionFetchAttempts = 0;
const MAX_SESSION_FETCH_ATTEMPTS = 3;

apiClient.interceptors.request.use(
  async (config) => {
    try {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
      
      // If we're in build time, log but continue with the request
      // The response interceptor will handle mocking the response
      if (isBuildTime) {
        console.log("Build time detected, will mock response in response interceptor");
        return config;
      }
      
      // Skip session fetch for auth-related endpoints to prevent loops
      if (config.url?.includes('/auth/') || sessionFetchAttempts >= MAX_SESSION_FETCH_ATTEMPTS) {
        console.log("Skipping session fetch for auth endpoint or max attempts reached");
        sessionFetchAttempts = 0;
        return config;
      }
      
      sessionFetchAttempts++;
      const session = await getSession();
      sessionFetchAttempts = 0;
      
      if (session?.accessToken) {
        config.headers.Authorization = `Token ${session.accessToken}`;
        console.log("Request includes auth token");
      }
    } catch (error) {
      console.error("Error getting session:", error);
      sessionFetchAttempts = 0;
    }
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    sessionFetchAttempts = 0;
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