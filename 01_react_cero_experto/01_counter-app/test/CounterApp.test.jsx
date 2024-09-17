import { render, screen } from "@testing-library/react"
import { CounterApp } from "../src/CounterApp"

describe('CounterApp', () => {

    const initlaValue = 10;
    test('should be to match with the snapshot',()=> {

        const { container } = render( <CounterApp value={ initlaValue } /> );

        expect( container ).toMatchSnapshot();
    })

    test('should display value = 100', () => {

        render( <CounterApp value={ initlaValue } /> ); 
        expect( screen.getByText(100) ).toBeTruthy();
    })
})