import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs"


describe('useFetchGifs', ()=> {

    test('should return the inital state', ()=>{

        const mockCategory = 'One puch';
        const { result } = renderHook( ()=> useFetchGifs(mockCategory) );
        const { images, isLoading } = result;

        expect( images.length ).toBe( 0 )
        expect( isLoading).toBeTruthy()
    })

    test('should return an array of images', async()=>{

        const mockCategory = 'One puch';
        const { result } = renderHook( ()=> useFetchGifs(mockCategory) );

        await waitFor(
            () => expect( result.current.images.length).toBeGreaterThan(0),
            // {
            //     timeout: 4000 // por defecto es 1000
            // }
        )

        const { images, isLoading } = result;

        expect( images.length ).toBeGreaterThan( 0 )
        expect( isLoading).toBeFalsy()
    })
})