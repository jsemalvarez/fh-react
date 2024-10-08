
import { PokemonsGrid } from "@/pokemons/components/PokemonsGrid";


export default async function PokemonsPage(){


    return(
        <div className="flex flex-col">
            <h3>Pokemons favoritos <small>global state</small></h3>
            <PokemonsGrid pokemons={[]} />
        </div>
    )
}  