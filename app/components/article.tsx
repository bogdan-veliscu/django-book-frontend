"use client"; // Mark this component as a Client Component
import { parseISO } from 'date-fns';
import React from 'react';

interface ArticleProps {
    title: string;
    description: string;
    image: string;
    updatedAt: string;
    author: {
        name: string;
        image: string;
    };
}

const Article: React.FC<ArticleProps> = ({ title, description, updatedAt, author }) => {
    return (
        <div className="article-preview p-6 bg-white shadow-lg rounded-lg mb-8">
            <div className="article-meta flex items-center justify-between">
                {/* Profile Image and Author Info */}
                <div className="flex items-center space-x-4">
                    <a href="profile.html">
                        <img
                            src={author?.image || 'http://i.imgur.com/Qr71crq.jpg'}
                            alt="Author profile"
                            className="w-12 h-12 rounded-full"
                        />
                    </a>
                    <div className="info">
                        <a href="" className="author text-lg font-semibold text-gray-800 hover:underline">
                            {author?.name || 'Anonymous'}
                        </a>
                        <span className="block text-sm text-gray-500">{parseISO(updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>
                {/* Like Button */}
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                    <i className="ion-heart text-red-500"></i>
                    <span>29</span>
                </button>
            </div>

            {/* Article Preview Link */}
            <a href="" className="preview-link mt-4 block text-left">
                <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    {title}
                </h2>
                <p className="text-gray-600 mt-2">{description}</p>
                <span className="text-blue-500 hover:underline mt-2 inline-block">Read more...</span>
            </a>
        </div>
    );
};

export default Article;