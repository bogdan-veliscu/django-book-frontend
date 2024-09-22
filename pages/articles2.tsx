import { useEffect } from 'react';
import { getArticles } from '../services/article-service';
import useArticleStore from '@/app/store/article-store';
import ArticleList from '@/app/components/article-list';


const ArticlesPage = () => {
    const { articles, setArticles } = useArticleStore();

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles();
            setArticles(data);
        };

        fetchArticles();
    }, [setArticles]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">New Articles</h1>
            <ArticleList articles={articles} />
        </div>
    );
};

export default ArticlesPage;