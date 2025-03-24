import React, { useState, useEffect } from "react";
import wordsData from "./wordsData";

const WordSearch = (props) => {
    const { onUpdateFavorites , showAlert} = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [history, favorites]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const foundWord = wordsData.find(
      (wordObj) => wordObj.word.toLowerCase() === searchTerm.toLowerCase()
    );

    const wordResult = foundWord || { word: "Not Found", meaning: "No definition available." };
    setResult(wordResult);

    // Update Search History
    if (!history.includes(wordResult.word)) {
      const updatedHistory = [wordResult.word, ...history.slice(0, 9)];
      setHistory(updatedHistory);
    }
  };

  const handleAddToFavorites = () => {
    if (result && result.word !== "Not Found" && !favorites.includes(result.word)) {
      const updatedFavorites = [...favorites, result.word];
      showAlert("Word Added to Favorites", "success");
      setFavorites(updatedFavorites);
      onUpdateFavorites(updatedFavorites);
    }else{
        showAlert("Word Not Added to Favorites", "warning");
    }
    
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4 fw-bold text-primary">🔍 Search for a Word</h2>
      
      {/* Search Box */}
      <div className="d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control w-50 rounded-pill px-3 shadow-sm"
          placeholder="Type a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ height: "40px" }}
        />
        <button 
          className="btn btn-primary ms-2 shadow-sm"
          onClick={handleSearch}
          style={{ height: "40px", padding: "0 15px", borderRadius: "8px" }}
        >
          🔎 Search
        </button>
      </div>

      {/* Display Result */}
      {result && (
        <div 
          className="card p-4 mt-4 shadow-sm text-white"
          style={{ background: "linear-gradient(135deg, #007bff, #6610f2)", borderRadius: "15px" }}
        >
          <h3 className="fw-bold">{result.word}</h3>
          <p><strong>📢 Pronunciation:</strong> {result.pronunciation || "N/A"}</p>
          <p><strong>📖 Meaning:</strong> {result.meaning}</p>
          {result.example && <p><strong>📝 Example:</strong> {result.example}</p>}

          {/* Favorite Button */}
          {result.word !== "Not Found" && (
            <button 
              className="btn btn-warning mt-3"
              onClick={handleAddToFavorites}
            >
              ⭐ Add to Favorites
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WordSearch;
