'use client'
import { useAppSelector } from "@/app/store/store";
import { PokemonsGrid } from "./PokemonsGrid";
import { IoHeartOutline } from "react-icons/io5";

export const PokemosFavorites = () => {

    const pokemons = useAppSelector( state => Object.values(state.pokemons ));

  return (
    <>
        
        {
            pokemons.length
                ? ( <PokemonsGrid pokemons={ pokemons } /> )
                : ( <NoFavorites /> )
        }
    </>
  )
}

export const NoFavorites = () => {
    return(
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline size={100} className="text-red-500"/>
            <span>No hay favoritos</span>
        </div>
    )
}
