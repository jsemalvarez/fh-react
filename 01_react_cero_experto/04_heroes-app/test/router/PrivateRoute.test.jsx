import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/router/PrivateRoute"


describe('PrivateRoute.jsx', () => { 

    test('should display the children component if it is logged', () => {

        Storage.prototype.setItem = jest.fn();

        const mockContext = {
            logged: true,
            user: {
                name:'josema',
                id:'1234'
            }
        }

        render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta privada') ).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', 'search?q=batman')

    })
})