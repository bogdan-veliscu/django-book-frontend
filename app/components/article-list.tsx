"use client";  // Mark this component as a Client Component

import React, { useEffect } from 'react';
import useArticleStore from '../store/article-store';
import Article from './article';

interface ArticleType {
    id: number;
    title: string;
    description: string;
    body: string;
    content: string;
    image: string;
    updatedAt: string;
    author: {
        name: string;
        image: string;
    }

}

const ArticleList: React.FC = () => {
    const { articles, setArticles } = useArticleStore();


    return (
        <div>
            {articles.map((article: ArticleType) => (
                <Article
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    description={article.description}
                    body={article.body}
                    image={article.image}
                    updatedAt={article.updatedAt}
                    author={article.author}
                />
            ))}
        </div>
    );
};

export default ArticleList;