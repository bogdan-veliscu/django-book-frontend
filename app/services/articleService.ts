import { type Article } from '@/interfaces/article';
import axios, { AxiosResponse } from 'axios';

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