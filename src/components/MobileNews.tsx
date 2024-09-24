"use client"

import { useEffect, useState } from "react";

// Define a type for the news articles based on the API response
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const MobileNews = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [articleNumber, setArticleNumber] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://saurav.tech/NewsAPI/everything/cnn.json');
        const data = await response.json();
        setNews(data.articles);
        setLoading(false);
      } catch (error) {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  const loadMoreArticles = () => {
    setArticleNumber(prev => prev + 5);
  };

  if (loading) {
    return <p className="text-center text-lg">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full flex flex-col space-y-6 p-4">
      {news.slice(0, articleNumber).map((article, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
        >
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <p className="text-gray-700 mb-4">{article.description}</p>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline font-medium"
          >
            Read More
          </a>
        </div>
      ))}

      {articleNumber < news.length && (
        <button 
          onClick={loadMoreArticles} 
          className="self-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default MobileNews;