import { retornaArreglo } from "../../src/base-pruebas/07-deses-arr"


describe('07-desestructurcion de arreglos', () => {

    test('retornaArreglo should return an string and a number', () => {

        const[ letters, numbers ] = retornaArreglo()

        expect( letters ).toBe('ABC')
        expect( numbers ).toBe(123)

        expect( typeof letters ).toBe('string')
        expect( typeof numbers ).toBe('number')

        // expect.any(String) evalua que sea cualquier string
        expect( letters ).toEqual( expect.any(String) )
    })

    test('retornaArreglo should return an string and a number', () => {

        const[ letters, numbers ] = retornaArreglo()

        expect( letters ).toBe('ABC')
        expect( numbers ).toBe(123)

        expect( typeof letters ).toBe('string')
        expect( typeof numbers ).toBe('number')

        // expect.any(String) evalua que sea cualquier string
        expect( letters ).toEqual( expect.any(String) )
    })

})

