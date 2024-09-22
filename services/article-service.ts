import axios from 'axios';
import { type Article} from '../interfaces/article';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const getArticles = async () : Promise<Article[]> => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data as Article[];
};

export const getArticleBySlug = async (slug: string) : Promise<Article> => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  const article = (response.data as { article: Article }).article;
  return article
}