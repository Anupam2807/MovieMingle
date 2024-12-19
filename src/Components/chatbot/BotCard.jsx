import React from 'react';

const BotCard = ({ movie }) => {
  const { title, year, rating, overview, poster, url } = movie;

  return (
    <div className="bg-gray-800 w-[70%] text-white rounded-lg shadow-lg p-4 max-w-sm ml-2 ">
      <div className="w-full h-64 rounded overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400 text-sm">{year || 'Unknown Year'}</p>
        <div className="mt-2 flex items-center">
          <span className="bg-green-600 text-xs px-2 py-1 rounded">{rating?.toFixed(1)}</span>
          <span className="ml-2 text-sm text-gray-400">TMDB Rating</span>
        </div>
        <p className="mt-3 text-sm text-gray-300 line-clamp-3">{overview}</p>
      </div>
      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F68B1F] hover:underline"
        >
          View More Details
        </a>
      </div>
    </div>
  );
};

export default BotCard;
