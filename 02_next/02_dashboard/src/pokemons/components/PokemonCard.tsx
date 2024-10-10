'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { SimplePokemon } from '../interfaces/simple-pokemon'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { toggleFavorite } from '@/app/store/pokemons/pokemonSlice'

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

    const isfavorite = useAppSelector( state => !!state.pokemons[pokemon.id ])
    const dispatch = useAppDispatch()

    const onToggle = () => {
        dispatch( toggleFavorite(pokemon) )
    }

  return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">

                <Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} 
                    alt={pokemon.name}  
                    height={100}              
                    width={100}              
                />
                
                <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{pokemon.name}</p>
                <div className="mt-5">
                    <Link
                        href={`/dashboard/pokemon/${ pokemon.id }`}
                        className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
                    >
                    Mas informacion
                    </Link>
                </div>
                </div>
                <div className="border-b">
                    <div
                        onClick={ onToggle }
                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                            <div className="text-red-600">
                                {
                                    isfavorite 
                                        ? (<IoHeart />)
                                        : (<IoHeartOutline />)
                                }
                                
                            </div>
                            <div className="pl-3">
                                <p className="text-sm font-medium text-gray-800 leading-none">
                                    {
                                        isfavorite
                                            ? 'Es favorito'
                                            : 'No es favorito'
                                    }
                                </p>
                                <p className="text-xs text-gray-500">Click para cambiar</p>
                            </div>
                    </div>
                </div>

            </div>
        </div>
  )
}
