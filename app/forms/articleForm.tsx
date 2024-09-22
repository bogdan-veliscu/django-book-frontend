import React, { useEffect } from 'react';
import Article from './Article';
import useArticleStore from '@/store/articleStore';

const ArticleList = () => {
    const { articles, setArticles } = useArticleStore();

    useEffect(() => {
        articles;
    }, [articles]);

    return (
        <div>
            {articles.map(article => <Article key={article.id} {...article} />)}
        </div>
    );
};

export default ArticleList;