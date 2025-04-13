// Client/components/Home.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Home = ({ onFlashcardsGenerated }) => {
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        response = await axios.post('http://localhost:5000/api/flashcards/pdf', formData);
      } else {
        response = await axios.post('http://localhost:5000/api/flashcards', {
          text: textInput,
        });
      }

      onFlashcardsGenerated(response.data.flashcards);
    } catch (err) {
      console.error('Error generating flashcards:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">📚 Welcome to Flashify</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows="6"
          className="w-full p-2 border rounded"
          placeholder="Or paste your notes here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />

        <div>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>
    </div>
  );
};

export default Home;
