import { types } from "../../../src/auth/types/types"


describe('auth types.js', () => {

    test('should match with this types', () => {

        expect( types ).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        })
    })
})