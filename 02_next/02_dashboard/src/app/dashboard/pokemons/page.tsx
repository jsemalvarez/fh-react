import { PokemonsResponse, SimplePokemon } from "@/pokemons";
import { PokemonsGrid } from "@/pokemons/components/PokemonsGrid";

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {

    const dataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const pokemonsResponse: PokemonsResponse = await dataResponse.json();

    const pokemonsFormated = pokemonsResponse.results.map( pokemon => ({
        id: pokemon.url.split('/').at(-2)!, 
        name: pokemon.name
    }))

    return pokemonsFormated;
}

export default async function PokemonsPage(){

    const pokemons = await getPokemons(151);

    return(
        <div className="flex flex-col">
            <PokemonsGrid pokemons={pokemons} />
        </div>
    )
}  