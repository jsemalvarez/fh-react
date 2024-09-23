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

})