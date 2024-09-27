import { authReducer } from "../../../src/auth"
import { types } from "../../../src/auth/types/types"


describe('authReducer', () => {

    const initialState = {
        logged: false
    }

    test('should return the initial state',() => {

        const authState = authReducer(initialState, {})

        expect( authState.logged ).toBe( initialState.logged ) 
        expect( authState.user ).toBe( undefined ) 

    })

    test('should call login and set user',() => {

        const action = {
            type: types.login,
            payload: {
                name: 'josema',
                id: '123'
            }
        }

        const authState = authReducer(initialState, action)

        expect( authState.logged ).toBeTruthy()
        expect( authState.user.name ).toBe( action.payload.name ) 
        expect( authState.user.id ).toBe( action.payload.id ) 

    })

    test('should call logout and clear the user',() => {

        const mockState = {
            logged: true,
            user: {
                name: 'josema',
                id: '123'
            }
        }

        const action = {
            type: types.logout
        }

        const authState = authReducer(mockState, action)

        expect( authState.logged ).toBeFalsy()
        expect( authState.user ).toBe( undefined ) 
    })
})