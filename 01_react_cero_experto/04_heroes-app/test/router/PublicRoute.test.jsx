import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth/context/AuthContext"
import { PublicRoute } from "../../src/router/PublicRoute"
import { MemoryRouter, Route, Routes } from "react-router-dom"


describe('PublicRoutes.jsx', () => {

    test('should display the children component if it is not logged', () => {

        const mockContext = {
            logged: false
        }

        render(
            <AuthContext.Provider value={mockContext}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta publica') ).toBeTruthy()

    })

    test('should navigate if it is logged', () => {

        const mockContext = {
            logged: true,
            user:{
                name: 'josema',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={ <h1>Pagina de Marvel</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Pagina de Marvel') ).toBeTruthy()

    })
})