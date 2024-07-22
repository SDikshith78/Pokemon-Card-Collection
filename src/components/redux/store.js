import { configureStore, createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState:{
        selectedPokemon: null,
        isModalOpen: false,
    },
    reducers: {
        selectPokemon(state, action){
            state.selectedPokemon = action.payload;
            state.isModalOpen = true;
        },
        closeModal(state){
            state.isModalOpen = false;
        }

    }
})

export const { selectPokemon, closeModal } = pokemonSlice.actions;

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
    }
})

export default store;