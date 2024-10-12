
import {useState, useEffect } from 'react';
import { fetchArticles } from '@/services/articleService';
import useArticleStore from '@/store/articleStore';

export const useArticles = () => {
  const { articles, setArticles } = useArticleStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [setArticles]);

  return { articles, loading, error };
};