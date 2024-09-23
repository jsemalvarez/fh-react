import { fireEvent, render, screen } from "@testing-library/react"
import { AddCategory } from "../../src/components/AddCategory"


describe('AddCategory', () => {

    test('should update the input value when typing', () => {

        const mockCategory = 'Saitama';
        const mockEvent = { target: { value: mockCategory}}

        render( <AddCategory onNewCategory={ () => {} } />)
        const input = screen.getByRole('textbox')

        fireEvent.input( input, mockEvent )

        expect( input.value ).toBe( mockCategory );
    })

    test('should call onNewCategory if the input has a value', () => {

        const mockCategory = 'Saitama';
        const onNewCategory = jest.fn();

        render( <AddCategory onNewCategory={ onNewCategory } />)

        const input = screen.getByRole('textbox')
        const form = screen.getByRole('form')
        const mockEvent = { target: { value: mockCategory }}

        fireEvent.input( input, mockEvent );
        fireEvent.submit( form )

        // los valores de input se pasan por refencia,
        // por eso, si se hizo el submit, el input esta vacio
        expect( input.value ).toBe( '' );

        expect( onNewCategory ).toHaveBeenCalled();
        expect( onNewCategory ).toHaveBeenCalledTimes(1);
        expect( onNewCategory ).toHaveBeenCalledWith( mockCategory );
    })

    test('should not called onNewCategory if input value is empty when is submitted', () => {

        const onNewCategory = jest.fn();

        render( <AddCategory onNewCategory={ onNewCategory } /> );

        const input = screen.getByRole('textbox')
        const form = screen.getByRole('form')

        fireEvent.submit( form );

        expect( input.value ).toBe( '' );
        expect( onNewCategory ).not.toHaveBeenCalled();
        expect( onNewCategory ).toHaveBeenCalledTimes( 0 )        
    })

})