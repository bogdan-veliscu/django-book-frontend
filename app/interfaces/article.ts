import {type Author} from './author';

export type Article = {
    slug: string;
    title: string;
    description: string;
    body: string;
    image: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
    };

