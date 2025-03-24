import React, { useState, useEffect } from "react";

const FavoritesHistory = (props) => {
    const {showAlert} = props;
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("history", JSON.stringify(history));
  }, [favorites, history]);

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
    showAlert("Favorites History Cleared","success");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
    showAlert("Search History Cleared","success");
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary">📌 Favorites & History</h2>

      {/* Favorites Section */}
      <div className="card p-3 mt-3 shadow-sm">
        <h4 className="text-warning">⭐ Favorites</h4>
        {favorites.length > 0 ? (
          <ul className="list-group">
            {favorites.map((word, index) => (
              <li key={index} className="list-group-item">{word}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No favorites added.</p>
        )}
        <button className="btn btn-danger mt-2" onClick={handleClearFavorites}>Clear Favorites</button>
      </div>

      {/* History Section */}
      <div className="card p-3 mt-3 shadow-sm">
        <h4 className="text-secondary">📜 Search History</h4>
        {history.length > 0 ? (
          <ul className="list-group">
            {history.map((word, index) => (
              <li key={index} className="list-group-item">{word}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No search history available.</p>
        )}
        <button className="btn btn-danger mt-2" onClick={handleClearHistory}>Clear History</button>
      </div>
    </div>
  );
};

export default FavoritesHistory;
