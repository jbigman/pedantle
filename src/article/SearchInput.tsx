import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const SearchInput = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  const { data: results, error, isValidating } = useSWR(
    query ? `https://api/searchWord?query=${query}` : null,
    fetcher
  );

  const handleSearch = () => {
    if (!input.trim()) return;
    setQuery(input); // Trigger SWR request
  };

  return (
    <div>
      <h1>Pedantle</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a word..."
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button type="button" onClick={handleSearch} style={{ padding: '10px' }}>
        Search
      </button>

      {isValidating && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>An error occurred while fetching results.</p>}

      <ul>
        {results?.map((result: { id: string; guess: string; score: number }) => (
          <li key={result.id}>
            <strong>{result.guess}</strong> - Score: {result.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
