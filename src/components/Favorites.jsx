import React, { useCallback, useEffect, useState } from 'react';
import { db, auth } from '..//components/firebase/Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import PokemonCard from './PokemonCard';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [user] = useAuthState(auth);

  const fetchFavorites = useCallback(async () => {
    if (user) {
      try {
        const favCollection = collection(db, 'favorites', user.uid, 'pokemon');
        const favSnapshot = await getDocs(favCollection);
        const favList = favSnapshot.docs.map(doc => doc.data());
        setFavorites(favList);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div>
      <h2>Favorites</h2>
      <div className="flex flex-wrap justify-center">
        {favorites.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            type={pokemon.type}
            imageUrl={pokemon.imageUrl}
            height={pokemon.height}
            weight={pokemon.weight}
            moves={pokemon.moves}
            refreshFavorites={fetchFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;