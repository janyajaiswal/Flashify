import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz'; // coming soon

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  return (
    <div>
      {flashcards.length === 0 ? (
        <Home onFlashcardsGenerated={setFlashcards} />
      ) : (
        <Quiz flashcards={flashcards} />
      )}
    </div>
  );
};

export default App;
