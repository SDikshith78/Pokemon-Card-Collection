import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./store";
import { XyzTransitionGroup } from "@animxyz/react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { db } from "../firebase/Firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";

import "@animxyz/core";
import "../../App.css";

export default function PokemonModal() {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon);
  const isModalOpen = useSelector((state) => state.pokemon.isModalOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [likes, setLikes] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user && selectedPokemon) {
        const docRef = doc(db, 'favorites', user.uid, 'pokemon', selectedPokemon.name);
        const docSnap = await getDoc(docRef);
        setLikes((prevLikes) => ({
          ...prevLikes,
          [selectedPokemon.name]: docSnap.exists(),
        }));
      }
    };
    checkIfLiked();
  }, [user, selectedPokemon]);

  if (!isModalOpen || !selectedPokemon) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(closeModal());
      setIsClosing(false);
    }, 200);
  };

  const handleLike = async () => {
    if (!user){ 
      alert('Please log in to like this Pokémon.');
      return
    }
    const currentLikeStatus = likes[selectedPokemon.name];
    const docRef = doc(db, 'favorites', user.uid, 'pokemon', selectedPokemon.name);

    const pokemonData = {
      name: selectedPokemon.name,
      imageUrl: selectedPokemon.imageUrl,
      type: selectedPokemon.type,
      height: selectedPokemon.height,
      weight: selectedPokemon.weight,
      moves: selectedPokemon.moves,
      refreshFavorites: selectedPokemon.refreshFavorites ? true : false // Ensure it's either true or false
    };

    if (!currentLikeStatus) {
      // Add to favorites
      await setDoc(docRef, pokemonData);
    } else {
      // Remove from favorites
      await deleteDoc(docRef);
    }

    setLikes((prevLikes) => ({
      ...prevLikes,
      [selectedPokemon.name]: !currentLikeStatus,
    }));
    if (selectedPokemon.refreshFavorites) {
      selectedPokemon.refreshFavorites();
    }
  };

  // Starting Capital letter
  function capitalFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <XyzTransitionGroup className={`item-group ${isClosing ? 'xyz-out' : ''}`}>
        {!isClosing && (
          <div className="bg-white p-8 rounded-lg w-[350px] md:w-[500px] lg:w-[600px] flip-scale-down-hor">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {capitalFirstLetter(selectedPokemon.name)}
            </h1>
            <div className="flex flex-col md:flex-row items-center">
              <div className="-mt-[59%] hover:cursor-pointer" onClick={handleLike}>
                <p>{likes[selectedPokemon.name] ? <FcLike size={30} /> : <FaRegHeart size={30} />}</p>
              </div>
              <img
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg"
                src={selectedPokemon.imageUrl}
                alt={selectedPokemon.name}
              />
              <div className="md:ml-6 mt-4 md:mt-0 font-gilroyMedium">
                <p><span className="font-gilroyBlack relative -left-1">Type:</span> {selectedPokemon.type}</p>
                <p><span className="font-gilroyBlack relative -left-9">Height:</span> {selectedPokemon.height}</p>
                <p><span className="font-gilroyBlack relative -left-8">Weight:</span> {selectedPokemon.weight}</p>
                <p className="text-lg mb-2">
                  <span className="font-gilroyBlack relative -left-11">Moves:</span>
                  <ul className="list-disc list-inside relative -left-1">
                    {selectedPokemon.moves && selectedPokemon.moves.length > 0 ? (
                      selectedPokemon.moves.map((move, index) => (
                        <li key={index}>{move}</li>
                      ))
                    ) : (
                      <li>No moves available</li>
                    )}
                  </ul>
                </p>
              </div>
            </div>
            <div className="items-center flex justify-center">
              <button
                className="bg-red-500 text-white p-2 rounded mt-4"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </XyzTransitionGroup>
    </div>
  );
}
