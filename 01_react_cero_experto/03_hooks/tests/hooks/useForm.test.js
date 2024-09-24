import { renderHook } from "@testing-library/react"
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
})