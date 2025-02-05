"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ArticleList from "@/components/article-list";
import { Article } from "@/types";
import ErrorMessage from "@/components/error-message";
import LoadingSpinner from "@/components/loading-spinner";

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await api.get("/api/articles");
                if (response.data?.articles) {
                    setArticles(response.data.articles);
                } else {
                    console.warn("Unexpected API response structure:", response.data);
                    setArticles([]);
                }
            } catch (err: any) {
                console.error("Error fetching articles:", err);
                setError(err?.response?.data?.detail || err?.message || "Failed to load articles");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!articles.length) return <div>No articles found.</div>;

    return <ArticleList articles={articles} />;
} 