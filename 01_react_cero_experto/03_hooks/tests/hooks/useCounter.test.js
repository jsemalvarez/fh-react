import { renderHook, waitFor } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter"


describe('useCounter', () => {

    test('should return the initial values', ()=> {

        const { result } = renderHook( () => useCounter() );
        const { counter, increment, decrement, reset } = result.current;

        expect( counter ).toBe(10);
        expect( increment ).toEqual( expect.any( Function ) );
        expect( decrement ).toEqual( expect.any( Function ) );
        expect( reset ).toEqual( expect.any( Function ) );

    })

    test('should set counter to initial value', () => {

        const initialValue = 100; 
        const { result } = renderHook( () => useCounter( initialValue ) );
        const { counter } = result.current; 

        expect( counter ).toBe( initialValue );
    })
})