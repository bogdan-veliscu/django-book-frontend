
import { create } from 'zustand';
import { Article } from '@/interfaces/article';

type ArticleState = {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
};

const useArticleStore = create<ArticleState>((set: (partial: Partial<ArticleState>) => void) => ({
  articles: [],
  setArticles: (articles: Article[]) => set({ articles }),
}));

export default useArticleStore;