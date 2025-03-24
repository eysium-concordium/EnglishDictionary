import React, { useState, useEffect } from "react";

const WordOfTheDay = (props) => {
  const [wordData, setWordData] = useState(null);

  // Dummy words (you can replace this with an API)
  const wordsList = [
    { word: "Happy", meaning: "Feeling or showing pleasure or contentment.", pronunciation: "/ˈhæpi/" },
    { word: "Bright", meaning: "Giving off lots of light or intelligence.", pronunciation: "/braɪt/" },
    { word: "Kind", meaning: "Being nice and considerate to others.", pronunciation: "/kaɪnd/" },
    { word: "Fast", meaning: "Moving quickly.", pronunciation: "/fæst/" },
    { word: "Cold", meaning: "Having a low temperature.", pronunciation: "/koʊld/" },
    { word: "Soft", meaning: "Not hard or firm to the touch.", pronunciation: "/sɔːft/" },
    { word: "Big", meaning: "Of considerable size or extent.", pronunciation: "/bɪg/" },
    { word: "Small", meaning: "Not large in size or amount.", pronunciation: "/smɔːl/" },
    { word: "Jump", meaning: "To push oneself off the ground into the air.", pronunciation: "/dʒʌmp/" },
    { word: "Laugh", meaning: "To make sounds of amusement or happiness.", pronunciation: "/læf/" }
  ];

  useEffect(() => {
    // Select a random word from the list
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
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
