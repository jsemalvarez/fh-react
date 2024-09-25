import { render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples"
import { useFetch } from "../../src/hooks/useFetch"

jest.mock('../../src/hooks/useFetch')

describe('MultipleCustomHooks', () => {

    test('should render the initial state',() => {

        useFetch.mockReturnValue({
            data:null,
            isLoading: true,
            hasError: null
        })

        render( <MultipleCustomHooks /> )

        expect( screen.getByText('BreakingBad Quotes') );
        expect( screen.getByText('Loading...') );

        const nextButton = screen.getByRole('button',{ name: 'Next quote'})
        expect( nextButton.disabled ).toBeTruthy()
    })

    test('should display a Quote', ()=> {

        const mockQuote = {author:'josema', quote:'hola mundo'};
        useFetch.mockReturnValue({
            data:[mockQuote],
            isLoading: false,
            hasError: null
        })

        render( <MultipleCustomHooks /> );

        expect( screen.getByText(mockQuote.quote) ).toBeTruthy()
        expect( screen.getByText(mockQuote.author) ).toBeTruthy()
        
        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        expect( nextButton.disabled ).toBeFalsy()
    })
})