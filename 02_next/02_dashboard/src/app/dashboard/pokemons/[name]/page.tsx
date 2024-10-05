import { PokemonsResponse } from "@/pokemons";
import { Pokemon } from "@/pokemons/components/Pokemon";
import { PokemonResponse } from "@/pokemons/interfaces/pokemon-response"
import { notFound } from "next/navigation";

interface Props{
    params: { name: string }
}

//! En build time
export async function generateStaticParams() {

    const data:PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then( res => res.json() );
  
      const static151Pokemons = data.results.map( pokemon => ({
        name: pokemon.name,
      }));
  
      return static151Pokemons.map( ({ name }) => ({
        name: name
      }));
  
}

const getPokemonByName = async (name:string): Promise<PokemonResponse> => {

    try {
        const dataResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`,
            {
                next:{
                    revalidate: 60 * 60 * 30 * 6
                }
            }
        )
        const pokemonRespose = await dataResponse.json();
        return pokemonRespose;
    } catch (error) {
        console.log(error)
        notFound()
    }
}

export default async function PokemonPage( { params }:Props ){

    const pokemon = await getPokemonByName( params.name )

    return ( <Pokemon pokemon={pokemon} />)
}