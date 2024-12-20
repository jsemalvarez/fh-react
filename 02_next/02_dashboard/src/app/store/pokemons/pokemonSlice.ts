import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonsState{
    [key: string]: SimplePokemon
}

const initialState: PokemonsState = {
    '1': { id: '1', name: 'bulbasor'},
    '5': { id: '5', name: 'charmeleon'},
    '9': { id: '9', name: 'blastoise'},
}

const pokemonsSlice =  createSlice({
    name: 'counter',
    initialState,
    reducers: { 

        toggleFavorite( state, action: PayloadAction<SimplePokemon>){

            const pokemon = action.payload;
            const { id } = pokemon;

            if( !!state[id] ){
                delete state[id];
                return;
            }

            state[id] = pokemon; 
        }
    }
})

export const { toggleFavorite } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;