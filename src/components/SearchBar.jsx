import React from "react";

export default function SearchBar({ searchQuery, handleSearchChange }) {
  return (
    <div>
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search Pokémon here..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-1 border-2 rounded-lg border-zinc-400 outline-none"
        />
      </div>
    </div>
  );
}
