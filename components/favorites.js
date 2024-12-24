"use client";
import { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.favorites || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((fav) => (
            <li key={fav.id} className="p-2 border border-gray-200 rounded">
              <h2 className="font-bold mb-1">{fav.dishName}</h2>
              <pre className="whitespace-pre-wrap text-sm">{fav.recipeText}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
