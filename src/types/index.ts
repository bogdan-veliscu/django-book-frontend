export interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
    bio?: string;
    image?: string;
  };
}

export interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}

export interface APIError {
  error: string;
  detail?: string;
} 