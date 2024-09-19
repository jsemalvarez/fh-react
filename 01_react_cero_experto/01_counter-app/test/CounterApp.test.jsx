import { fireEvent, render, screen } from "@testing-library/react"
import { CounterApp } from "../src/CounterApp"

describe('CounterApp', () => {

    const initlaValue = 10;

    test('should be to match with the snapshot',()=> {

        const { container } = render( <CounterApp value={ initlaValue } /> );

        expect( container ).toMatchSnapshot();
    })

    test('should display value = 10', () => {

        render( <CounterApp value={ initlaValue } /> ); 
        expect( screen.getByText(10) ).toBeTruthy();
    })

    test('should increment by one ', () => {

        render( <CounterApp value={initlaValue}/> );
        fireEvent.click( screen.getByText('+1') );

        expect( screen.getByText('11')).toBeTruthy();
    })

    test('should subtract one ', () => {

        render( <CounterApp value={initlaValue}/> );
        fireEvent.click( screen.getByText('-1') );

        expect( screen.getByText('9')).toBeTruthy();
    })

    test('should reset the counter ', () => {

        render( <CounterApp value={ 333 }/> );
        fireEvent.click( screen.getByText('+1') );
        fireEvent.click( screen.getByText('+1') );
        fireEvent.click( screen.getByText('+1') );

        // fireEvent.click( screen.getByText('Reset') );
        fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }));

        expect( screen.getByText('333')).toBeTruthy();
    })
})