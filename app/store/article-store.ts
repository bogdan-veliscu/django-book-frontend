import { create } from 'zustand';

interface Article {
    // Define the properties of an article here
    id: number;
    title: string;
    content: string;
}

interface ArticleStore {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
}

const useArticleStore = create<ArticleStore>((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
}));

export default useArticleStore;