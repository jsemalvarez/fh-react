import { renderHook } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs"


describe('useFetchGifs', ()=> {

    test('should return the inital state', ()=>{

        const mockCategory = 'One puch';
        const { result } = renderHook( ()=> useFetchGifs(mockCategory) );
        const { images, isLoading } = result;

        expect( images.length ).toBe( 0 )
        expect( isLoading).toBeTruthy()
    })

    
})