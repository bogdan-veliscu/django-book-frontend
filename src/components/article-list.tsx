import { Article } from "@/types";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (!articles?.length) {
    return (
      <div className="text-center py-8">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <article key={article.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">{article.title || 'Untitled'}</h2>
          <p className="text-gray-600">{article.description || 'No description available'}</p>
        </article>
      ))}
    </div>
  );
} 