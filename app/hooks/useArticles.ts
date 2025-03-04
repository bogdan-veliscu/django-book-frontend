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
        setError(null);
      } catch (err: any) {
        console.error('Error in useArticles hook:', err);
        setError(err?.message || 'Error fetching articles');
        // Set empty array to prevent undefined errors in the UI
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [setArticles]);

  return { articles, loading, error };
};