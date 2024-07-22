import React from 'react';

export default function Filter({ handleFilterChange, handleSortChange, types }) {
  return (
    <div className="flex flex-col space-y-2 p-2 absolute right-40 mr-60 top-[35%]">
      <div className='border-2 border-zinc-400 p-1 rounded-md'>
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select id="sort" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className='border-2 border-zinc-400 p-1 rounded-md mb-1'>
        <label htmlFor="type" className="mr-2">Filter by Type:</label>
        <select id="type" onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All</option>
          {types && types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
