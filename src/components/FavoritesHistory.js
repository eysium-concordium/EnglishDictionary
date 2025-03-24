import React, { useState, useEffect } from "react";

const FavoritesHistory = ({ showAlert }) => {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("history", JSON.stringify(history));
  }, [favorites, history]);

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
    showAlert("Favorites History Cleared", "success");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
    showAlert("Search History Cleared", "success");
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary text-center">📌 Favorites & History</h2>

      {/* Favorites Section */}
      <div className="card mt-4 shadow-lg border-0 rounded-4 p-3">
        <div className="card-body">
          <h4 className="text-warning fw-bold mb-3">
            ⭐ Favorites
          </h4>
          {favorites.length > 0 ? (
            <ul className="list-group list-group-flush">
              {favorites.map((word, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {word} <span className="badge bg-warning text-dark">★</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted fst-italic">No favorites added.</p>
          )}
          <button className="btn btn-danger w-100 mt-3 rounded-pill fw-bold" onClick={handleClearFavorites}>
            🗑 Clear Favorites
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className="card mt-4 shadow-lg border-0 rounded-4 p-3">
        <div className="card-body">
          <h4 className="text-secondary fw-bold mb-3">
            📜 Search History
          </h4>
          {history.length > 0 ? (
            <ul className="list-group list-group-flush">
              {history.map((word, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {word} <span className="badge bg-secondary">⏳</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted fst-italic">No search history available.</p>
          )}
          <button className="btn btn-danger w-100 mt-3 rounded-pill fw-bold" onClick={handleClearHistory}>
            🗑 Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesHistory;
