import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"

describe('AppRoute.jsx', () => { 

    test('should display LoginPage if it is not logged', () => {

        const mockContext = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={ mockContext }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Login').length ).toBe( 2 )
    })

    test('should display MarvelPage if it is logged', () => {

        const mockContext = {
            logged: true,
            user: {
                name:'josema',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={ mockContext }>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1)
        expect( screen.getByText('Marvel Comics') ).toBeTruthy()
    })

 })