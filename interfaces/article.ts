import { Author } from "./author";

export type Article = {
    id: number;
    title: string;
    description: string;
    body: string;
    content: string;
    image?: string;
    updatedAt: string;
    author: Author;
    slug: string;
};