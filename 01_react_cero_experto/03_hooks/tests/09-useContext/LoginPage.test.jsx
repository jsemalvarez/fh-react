import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../src/09-useContext/LoginPage"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { useContext } from "react"

describe('LoginPage', () => {

    const user = {
        id: 1,
        name: 'josema'
    }

    useContext

    test('should display the component without the user', ()=> {

        render(
            <UserContext.Provider value={{ user: null}}>
                <LoginPage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('pre') //area-label

        expect( preTag.innerHTML ).toBe( 'null' );
    })

    test('should call setUser', () => {

        const setUserMock = jest.fn();
        render(
            <UserContext.Provider value={{user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        )

        const loginBtn = screen.getByRole('button');

        fireEvent.click( loginBtn )

        expect( setUserMock ).toHaveBeenCalledWith({ id: 123, name: 'Juan', email: 'juan@google.com' } )
    })
})