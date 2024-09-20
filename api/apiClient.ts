import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Article {
    // Define the structure of an article based on your API response
    id: number;
    title: string;
    description: string;
    body: string;
    // Add other fields as necessary
}

export const fetchArticles = async (): Promise<Article[]> => {
    try {
        const response: AxiosResponse<Article[]> = await axios.get(`${API_URL}/articles`, {
      headers: {
        'Content-Type': 'application/json',  // Ensure you're sending JSON
      },
    });
        return response.data;
    } catch (error) {
        console.error('Fetching articles failed', error);
        return [];
    }
};
