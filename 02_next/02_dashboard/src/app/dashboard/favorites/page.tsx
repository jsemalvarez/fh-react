import { PokemosFavorites } from "@/pokemons/components/PokemosFavorites";


export const metadata = {
    title: 'Pokemons',
    description: 'Favoritos',
   };
   

export default async function PokemonsPage(){

    return(
        <div className="flex flex-col">
            <h3>Pokemons favoritos <small>global state</small></h3>
            <PokemosFavorites />
        </div>
    )
}  