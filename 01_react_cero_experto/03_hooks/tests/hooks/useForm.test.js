import { act, render, renderHook } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm"


describe('useForm', () => {

    const initialForm = {
        name:'josema',
        email:'josema@gmail.com'
    }

    test('should retrun de initial state', () => {

        const { result } = renderHook( () => useForm( initialForm ))
        
        expect( result.current ).toEqual({
            name:'josema',
            email:'josema@gmail.com',
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
        })
    })

    test('should update form filed value when onInputChange is called', () => {

        const newValue = 'piter';
        const mockEvent = {target:{name: 'name', value: newValue}}

        const { result } = renderHook( () => useForm( initialForm ) );
        const { onInputChange } = result.current

        act( () => {
            onInputChange( mockEvent )
        })

        expect( result.current.name ).toBe( newValue );
        expect( result.current.formState.name ).toBe( newValue );
    })

    test('should reset form when onResetForm is called', () => {

        const newValue = 'piter';
        const mockEvent = {target:{name: 'name', value: newValue}}

        const { result } = renderHook( () => useForm( initialForm ) );
        const { onInputChange, onResetForm } = result.current

        act( () => {
            onInputChange( mockEvent )
            onResetForm()
        })

        expect( result.current.name ).toBe( initialForm.name );
        expect( result.current.formState.name ).toBe( initialForm.name );
    })
    
})