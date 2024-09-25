import { render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples"


describe('MultipleCustomHooks', () => {

    test('should render the initial state',() => {

        render( <MultipleCustomHooks /> )

        expect( screen.getByText('BreakingBad Quotes') );
        expect( screen.getByText('Loading...') );

        const nextButton = screen.getByRole('button',{ name: 'Next quote'})
        expect( nextButton.disabled ).toBeTruthy()
    })
})