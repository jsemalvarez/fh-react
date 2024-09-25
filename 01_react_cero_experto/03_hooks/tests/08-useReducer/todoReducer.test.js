import { todoReducer } from "../../src/08-useReducer/todoReducer"


describe('todoReducer', () => {

    const initialState = [{
        id: 1,
        description: 'Demo Todo',
        done: false,
    }]

    test('should return the initial state', () => {

        const todoState = todoReducer(initialState)

        expect(todoState).toBe(initialState)
    })
})