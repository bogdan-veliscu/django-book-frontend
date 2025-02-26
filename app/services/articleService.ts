// Define the Article interface locally to avoid import errors
interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
  image?: string;
}

// Define the ArticleFormData interface locally
interface ArticleFormData {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

import axios from 'axios';
import apiClient from './apiClient';
import { auth } from "@/auth";

// Simple markdown conversion function
const htmlToMarkdown = (html: string): string => {
  // This is a very basic implementation
  return html
    .replace(/<h1>(.*?)<\/h1>/g, '# $1')
    .replace(/<h2>(.*?)<\/h2>/g, '## $1')
    .replace(/<h3>(.*?)<\/h3>/g, '### $1')
    .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<ul>(.*?)<\/ul>/g, '$1')
    .replace(/<li>(.*?)<\/li>/g, '- $1\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, '');
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await apiClient.get('/articles');
    console.log('Articles response:', response.data);
    
    // Handle different response formats
    if (response.data.articles) {
      return response.data.articles;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn('Unexpected response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticle = async (slug: string): Promise<Article | null> => {
  try {
    const response = await apiClient.get(`/articles/${slug}`);
    console.log('Article response:', response.data);
    
    // Handle different response formats
    if (response.data.article) {
      return response.data.article as Article;
    } else {
      return response.data as Article;
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const createArticle = async (data: ArticleFormData): Promise<Article | null> => {
  try {
    const articleData = {
      ...data,
      body: htmlToMarkdown(data.body),
      metadata: {
        font_size: "16px",
      }
    };
    
    console.log('Creating article with data:', articleData);
    
    const response = await apiClient.post(`/articles`, { 
      article: articleData
    });
    
    console.log('Create article response:', response.data);
    
    if (response.data.article) {
      return response.data.article as Article;
    } else {
      return response.data as Article;
    }
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};