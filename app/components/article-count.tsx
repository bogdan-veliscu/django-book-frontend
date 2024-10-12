
"use client";
import React from 'react';
import useArticleStore from '../store/articleStore';

const ArticleCount = () => {
    const articleCount = useArticleStore((state) => state.articles.length);

    return <p>Total Articles: {articleCount}</p>;
};

export default ArticleCount;