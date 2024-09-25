import { todoReducer } from "../../src/08-useReducer/todoReducer"


describe('todoReducer', () => {

    const initialState = [{
        id: 1,
        description: 'Demo Todo',
        done: false,
    }]

    test('should return the initial state', () => {

        const todoState = todoReducer(initialState, {})

        expect(todoState).toBe(initialState)
    })

    test('should add todo', () => {

        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                description: 'Test add todo',
                done: false,
            }
        }
        const todoState = todoReducer(initialState, action)

        expect( todoState.length ).toBe( 2 );
        expect( todoState ).toContain( action.payload );
    })
})