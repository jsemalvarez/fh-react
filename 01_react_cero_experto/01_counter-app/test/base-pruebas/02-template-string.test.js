import { getSaludo } from "../../src/base-pruebas/02-template-string";

describe('02-template-string', () => {

    test('should getSaludo return "Hola josema"', () => { 

        const name= 'josema';
        const message = getSaludo( name )

        expect( message ).toBe(`Hola ${name}`)
     })
     
})