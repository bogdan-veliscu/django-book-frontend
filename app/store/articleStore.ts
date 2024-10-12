import create from 'zustand';

const useArticleStore = create((set) => ({
  articles: [],
  setArticles: (articles: any) => set({ articles }),
}));

export default useArticleStore;