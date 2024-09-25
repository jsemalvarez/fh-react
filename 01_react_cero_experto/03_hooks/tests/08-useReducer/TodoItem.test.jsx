import { fireEvent, render, screen } from "@testing-library/react"
import { TodoItem } from "../../src/08-useReducer/TodoItem"



describe('TodoItem', ()=> {

    const todo = {
        id: 1,
        name: 'test TodoItem',
        done: false
    }

    const onDeleteTodoMock = jest.fn()
    const onToggleTodoMock = jest.fn()

    beforeEach( () => jest.clearAllMocks() )

    test('should display initial state', () => {

        render(
            <TodoItem
                todo={todo}
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        )

        const liElement = screen.getByRole('listitem');
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');

        // const spanElement = screen.getByRole('span'); // no toma el span
        const spanElement = screen.getByLabelText('span');

        expect( spanElement.className ).toBe('align-self-center ') // tiene un espacio al final
        expect( spanElement.className ).toContain('align-self-center')
        expect( spanElement.className ).not.toContain('text-decoration-line-through')
    })

    test('should display todo is done', () => {

        todo.done = true

        render(
            <TodoItem
                todo={todo}
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        )

        const spanElement = screen.getByLabelText('span');

        expect( spanElement.className ).toContain('text-decoration-line-through')
    })

    test('should call onToggleTodo with id param', () => {

        render(
            <TodoItem
                todo={todo}
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        )

        const spanElement = screen.getByLabelText('span');
        fireEvent.click( spanElement )   
        
        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id )
    })
})