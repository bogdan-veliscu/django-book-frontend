"use client";  // Mark this component as a Client Component

import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchArticles } from "./api/apiClient";

interface Article {
  id: number;
  title: string;
  description: string;
}

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.length > 0 ? (
        articles.map(article => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default HomePage;