// AI Casting Search Tool – Frontend (React + Tailwind)
// This is the React-based search interface (to be paired with a Flask backend)

import { useState } from 'react';
import axios from 'axios';

export default function AICastingSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/search', { query });
      setResults(response.data);
    } catch (err) {
      console.error('Search failed', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">🎭 AI Casting Profile Search</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="e.g., 30-year-old Telugu-speaking female for a comic role"
          className="flex-1 p-3 text-black rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-purple-400">Searching profiles...</p>}

      <div className="grid gap-6 mt-4">
        {results.map((actor, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <h2 className="text-xl font-bold">{actor.full_name}</h2>
            <p className="text-sm text-gray-300">Age: {actor.age} | Gender: {actor.gender}</p>
            <p className="mt-2">🎭 Theatre Experience: {actor.theatre_experience}</p>
            <p>🎬 Film/TV Experience: {actor.film_tv_experience}</p>
            <div className="flex gap-4 mt-3">
              <a
                href={actor.photo_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                View Photo
              </a>
              <a
                href={actor.portfolio_url}
                target="_blank"
                rel="noreferrer"
                className="text-green-400 underline"
              >
                View Portfolio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
