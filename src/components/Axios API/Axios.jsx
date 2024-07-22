import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../PokemonCard';
import SearchBar from '../SearchBar';
import Filter from '../Filter';

const Axios = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 35;
  const totalPages = 1281;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
      const results = response.data.results;
      

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          // console.log(pokemonResponse.data.moves);
          return {
            id: pokemonResponse.data.id,
            name: pokemonResponse.data.name,
            type: pokemonResponse.data.types.map((type) => type.type.name).join(', '),
            imageUrl: pokemonResponse.data.sprites.other.dream_world.front_default,
            height: pokemonResponse.data.height,
            weight: pokemonResponse.data.weight,
            moves: pokemonResponse.data.moves.slice(0, 5).map((move) => move.move.name)

          };
        })
      );

      setPokemonData(pokemonDetails);
      setLoading(false);
    };

    fetchPokemon();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPageNumbersToShow = 5;
    const halfPageNumbersToShow = Math.floor(totalPageNumbersToShow / 2);

    let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
    let endPage = Math.min(startPage + totalPageNumbersToShow - 1, totalPages);

    if (endPage - startPage < totalPageNumbersToShow - 1) {
      startPage = Math.max(endPage - totalPageNumbersToShow + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`py-1 px-2 rounded ${
            currentPage === 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`py-1 px-2 rounded ${
            currentPage === i ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`py-1 px-2 rounded ${
            currentPage === totalPages ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAndSortedPokemon = filteredPokemon.filter((pokemon) =>
    filterType ? pokemon.type.includes(filterType) : true
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else if (sortOrder === 'desc') {
      return b.id - a.id;
    } else {
      return 0;
    }
  });

  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dragon', 'dark', 'steel', 'fairy'
  ];

  return (
    <div className="flex flex-col items-center">
      <Filter
        handleFilterChange={setFilterType}
        handleSortChange={setSortOrder}
        types={types}
      />
      <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

      <div className="flex justify-center items-center flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredAndSortedPokemon.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              type={pokemon.type}
              imageUrl={pokemon.imageUrl}
              height={pokemon.height}
              weight={pokemon.weight}
              moves={pokemon.moves}
            />
          ))
        )}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <div className="flex space-x-1 mb-2">
          {renderPageNumbers()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Axios;
