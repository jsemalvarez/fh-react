import { getHeroeByIdAsync } from "../../src/base-pruebas/09-promesas"

describe('09-promesas',()=> {

    test('getHeroeByIdAsync should return an hero', (done) => {

        const mockHero = {
            id: 1,
            name: 'Batman',
            owner: 'DC'
        }

        getHeroeByIdAsync(mockHero.id)
            .then( (hero) => {

                expect(hero).toStrictEqual(mockHero)
                done()
            })
    })

    test('getHeroeByIdAsync should return an error when heroId not exists', (done) => {

        const heroId = 369;

        getHeroeByIdAsync( heroId )
            .catch( (error) => {

                expect( error ).toBe(`No se pudo encontrar el héroe ${heroId}`)
                done()
            })
    })

})