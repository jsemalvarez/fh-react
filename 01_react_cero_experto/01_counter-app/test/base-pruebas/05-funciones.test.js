import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones"


describe('05-funciones',() => {

    test('getUser should return an object', () => {

        const mockUser = {
            uid: 'ABC123',
            userName: 'El_Josema1502'
        }

        const user = getUser();

        expect( mockUser ).toEqual( user )
    })

    test('getUsuarioActivo should return an object', () => {

        const userName = 'josema'

        const mockUser = {
            uid: 'ABC567',
            userName: userName
        }

        const user = getUsuarioActivo(userName);

        expect( mockUser ).toStrictEqual( user )
    })

})