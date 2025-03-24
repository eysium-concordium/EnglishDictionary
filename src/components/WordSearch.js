import React, { useState, useEffect } from "react";
import wordsData from "./wordsData";

// Function to find the closest matching word using Levenshtein Distance
const getClosestMatch = (input, words) => {
  let minDistance = Infinity;
  let closestWord = null;

  words.forEach((word) => {
    const distance = levenshteinDistance(input, word.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closestWord = word;
    }
  });

  return minDistance <= 2 ? closestWord : null; // Suggest only if difference is small
};

// Levenshtein Distance Algorithm
const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

const WordSearch = (props) => {
  const { onUpdateFavorites, showAlert } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [history, favorites]);

  // Auto-Suggestions Based on Input
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = wordsData
      .map((wordObj) => wordObj.word)
      .filter((word) => word.toLowerCase().startsWith(searchTerm.toLowerCase()))
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredSuggestions);
  }, [searchTerm]);

  const handleSearch = (selectedWord = null) => {
    const wordToSearch = selectedWord || searchTerm.trim().toLowerCase();
    if (!wordToSearch) return;

    let foundWord = wordsData.find((wordObj) => wordObj.word.toLowerCase() === wordToSearch);

    if (!foundWord) {
      const closestMatch = getClosestMatch(wordToSearch, wordsData.map((w) => w.word.toLowerCase()));
      if (closestMatch) {
        showAlert(`Did you mean "${closestMatch}"?`, "info");
        foundWord = wordsData.find((wordObj) => wordObj.word.toLowerCase() === closestMatch);
      }
    }

    const wordResult = foundWord || { 
      word: "Not Found", 
      meaning: "No definition available.", 
      pronunciation: "N/A",
      origin: "N/A",
      etymology: "No etymology available."
    };

    setResult(wordResult);

    // Update Search History
    if (!history.includes(wordResult.word)) {
      const updatedHistory = [wordResult.word, ...history.slice(0, 9)];
      setHistory(updatedHistory);
    }

    setSuggestions([]); // Hide suggestions after search
  };

  const handleAddToFavorites = () => {
    if (result && result.word !== "Not Found" && !favorites.includes(result.word)) {
      const updatedFavorites = [...favorites, result.word];
      showAlert("Word Added to Favorites", "success");
      setFavorites(updatedFavorites);
      onUpdateFavorites(updatedFavorites);
    } else {
      showAlert("Word Not Added to Favorites", "warning");
    }
  };

  const handleShare = () => {
    if (!result || result.word === "Not Found") {
      showAlert("No word to share!", "warning");
      return;
    }

    const shareText = `📖 Word: ${result.word}
📢 Pronunciation: ${result.pronunciation}
📜 Meaning: ${result.meaning}
🌍 Origin: ${result.origin}
📜 Etymology: ${result.etymology}`;

    if (navigator.share) {
      navigator.share({
        title: `Learn a new word: ${result.word}`,
        text: shareText,
      }).then(() => showAlert("Shared successfully!", "success"))
        .catch(() => showAlert("Failed to share!", "danger"));
    } else {
      navigator.clipboard.writeText(shareText);
      showAlert("Copied to clipboard!", "success");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4 fw-bold text-primary">🔍 Search for a Word</h2>
      
      {/* Search Box */}
      <div className="d-flex justify-content-center align-items-center position-relative">
        <input
          type="text"
          className="form-control w-50 rounded-pill px-3 shadow-sm"
          placeholder="Type a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ 
            height: "45px", 
            fontSize: "16px", 
            border: "1px solid #ddd", 
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" 
          }}
        />
        <button 
          className="btn btn-primary ms-2 shadow-sm"
          onClick={() => handleSearch()}
          style={{ 
            height: "45px", 
            padding: "0 20px", 
            borderRadius: "10px", 
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          🔎 Search
        </button>

        {/* Auto-Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-50 mt-2 shadow-sm" style={{ zIndex: 1000 }}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action"
                onClick={() => handleSearch(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Result */}
      {result && (
        <div 
          className="card p-4 mt-4 shadow-lg text-white"
          style={{ 
            background: "linear-gradient(135deg, #007bff, #6610f2)", 
            borderRadius: "15px", 
            maxWidth: "500px", 
            margin: "auto",
            padding: "25px"
          }}
        >
          <h2 className="fw-bold">{result.word}</h2>
          <hr style={{ borderTop: "2px solid rgba(255, 255, 255, 0.3)" }} />
          <p><strong>📢 Pronunciation:</strong> {result.pronunciation}</p>
          <p><strong>📖 Meaning:</strong> {result.meaning}</p>
          <p><strong>🌍 Origin:</strong> {result.origin}</p>
          <p><strong>📜 Etymology:</strong> {result.etymology}</p>

          <button className="btn btn-warning mt-3 fw-bold" onClick={handleAddToFavorites}>⭐ Add to Favorites</button>
          <button className="btn btn-success mt-3 fw-bold ms-2" onClick={handleShare}>📤 Share</button>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
