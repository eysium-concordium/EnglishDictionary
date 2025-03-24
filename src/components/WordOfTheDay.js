import React, { useState, useEffect } from "react";
import wordsData from "./wordsData"; // Importing the words data

const WordOfTheDay = (props) => {
  const [wordData, setWordData] = useState(null);

  useEffect(() => {
    // Select a random word from wordsData
    const randomWord = wordsData[Math.floor(Math.random() * wordsData.length)];
    setWordData(randomWord);
  }, []);

  return (
    <div 
      className="container my-4 p-4 rounded shadow text-center" 
      style={{ 
        backgroundColor: props.mode === "dark" ? "#1e1e1e" : "#f8f9fa",
        color: props.mode === "dark" ? "white" : "black"
      }}
    >
      <h2 className="mb-3">📌 Word of the Day</h2>
      {wordData ? (
        <>
          <h3 className="fw-bold">{wordData.word}</h3>
          <p className="fst-italic">{wordData.pronunciation}</p>
          <p>{wordData.meaning}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WordOfTheDay;
