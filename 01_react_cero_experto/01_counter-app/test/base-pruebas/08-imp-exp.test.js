import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";


describe('08-imp-exp',() => {

    test('getHeroeById should return an hero by id',() => {

        const mockHero = {
            id: 1,
            name: 'Batman',
            owner: 'DC'
        }

        const hero = getHeroeById(mockHero.id)

        expect( hero ).toEqual( mockHero )
    })

    test('getHeroeById should return undefined if hero not exist',() => {

        const heroId = 369

        const hero = getHeroeById(heroId)

        expect( hero ).toEqual( undefined )
        expect( hero ).toEqual()
    })

    test('getHeroesByOwner should return only DC heros',() => {

        const herosDC = [
            { id: 1, name: 'Batman', owner: 'DC' },           
            { id: 3, name: 'Superman', owner: 'DC' },
            { id: 4, name: 'Flash', owner: 'DC' },
        ]

        const owner = 'DC';
        const herosFiltered = getHeroesByOwner(owner);
        const totalHerosDC = 3

        expect( herosFiltered.length  ).toBe( totalHerosDC )
        expect( herosFiltered ).toEqual( herosDC )
        expect( herosFiltered ).toEqual( heroes.filter( (heroe) => heroe.owner === owner ) )

    })

    test('getHeroesByOwner should return only DC heros',() => {

        const herosMarvel = [
            { id: 2, name: 'Spiderman', owner: 'Marvel' },           
            { id: 5, name: 'Wolverine', owner: 'Marvel' },
        ]

        const owner = 'Marvel';
        const herosFiltered = getHeroesByOwner(owner);
        const totalHerosMarvel = 2

        expect( herosFiltered.length  ).toBe( totalHerosMarvel )
        expect( herosFiltered ).toEqual( herosMarvel )
        //si bien tiene logica el test, permite ser dinamico a la hora de compar los heroes
        expect( herosFiltered ).toEqual( heroes.filter( (heroe) => heroe.owner === owner ) )

    })
})