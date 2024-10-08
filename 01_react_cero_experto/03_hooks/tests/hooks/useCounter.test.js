import { act, renderHook, waitFor } from "@testing-library/react"
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


    test('should increment', ()=> {

        const initialValue = 100; 
        const firstIncrement = 1;
        const secondIncrement = 2;
        const tatalResult = initialValue + firstIncrement + secondIncrement

        const { result } = renderHook( () => useCounter( initialValue ) );
        const { counter, increment } = result.current

        // NOTA: para poder ejecutar en simultaneo el increment, el increment
        // debe tomar el valor actual del counter, no el valor directamente del counter
        // MODIFICAMOS el useCounter 
        // const increment = ( value = 1 ) => {
        //     // setCounter( counter + value );
        //     setCounter( (current) => current + value ); // 
        // } 
        act( () => {
            increment( firstIncrement )
            increment( secondIncrement )
        })
        
        // con valores promitivos, no se aplica referencia, 
        // por eso tenemos que usar el result
        // expect( counter ).toBe( tatalResult )
        expect( result.current.counter ).toBe( tatalResult )
    })

    test('should decrement', ()=> {

        const initialValue = 100; 
        const firstDecrement = 1;
        const secondDecrement = 2;
        const tatalResult = initialValue - firstDecrement - secondDecrement

        const { result } = renderHook( () => useCounter( initialValue ) );
        const { decrement } = result.current

        act( () => {
            decrement()
            decrement( 2 )
        })
        
        expect( result.current.counter ).toBe( tatalResult )
    })

    test('should reset', ()=> {

        const initialValue = 100; 
        const firstDecrement = 1;
        const secondDecrement = 2;

        const { result } = renderHook( () => useCounter( initialValue ) );
        const { decrement, reset } = result.current

        act( () => {
            decrement( firstDecrement )
            decrement( secondDecrement )
            reset()
        })
        
        expect( result.current.counter ).toBe( initialValue )
    })
})