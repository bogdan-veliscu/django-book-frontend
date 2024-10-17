import {  type Article } from '@/interfaces/article';
import axios, { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { auth } from  "@/auth";
import { ArticleFormData } from '@/components/article-form';
import { htmlToMarkdown } from '@/lib/markdownToHtml';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const fetchArticles = async (): Promise<Article[]>  => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const fetchArticle = async (slug: string): Promise<Article|null>  => {
  try {
    const response = await axios.get(`${API_URL}/articles/${slug}`);
    return response.data["article"] as Article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

export const createArticle = async (data: ArticleFormData): Promise<Article|null>  => {
  try {
    const response = await apiClient.post(`/articles`, { article: {...data, 
      body: htmlToMarkdown(data.body),
      metadata: {
      font_size: "16px",
    }} });
    
    return response.data["article"] as Article;
  } catch (error) {
    console.error('Error creating article:', error);
    return (error as any).response;
  }
}