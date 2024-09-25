import { render, screen } from "@testing-library/react";
import { useTodos } from "../../src/hooks/useTodos"
import { TodoApp } from "../../src/08-useReducer/TodoApp";

jest.mock('../../src/hooks/useTodos');

describe('TodoApp', () => {

    const todos = [
        {
            id:1,
            description: 'Todo #1',
            done: false
        },
        {
            id:2,
            description: 'Todo #2',
            done: true
        },
    ]

    useTodos.mockReturnValue({
        todos: todos,
        todosCount: 2,
        pendingTodosCount: 1,
        handleDeleteTodo: jest.fn(),
        handleToggleTodo: jest.fn(),
        handleNewTodo: jest.fn()
    })

    test('should display a list of todos', () => {

        render( <TodoApp /> );

        expect( screen.getByText('Todo #1') ).toBeTruthy();
        expect( screen.getByText('Todo #2') ).toBeTruthy();
        expect( screen.getByRole('textbox') ).toBeTruthy();
    })
})