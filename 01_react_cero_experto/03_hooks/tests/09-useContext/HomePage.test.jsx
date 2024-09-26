import { render, screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { HomePage } from "../../src/09-useContext/HomePage"


describe('HomePage', () => {

    const user = {
        id: 1,
        name: 'josema'
    }

    test('sould display component without the user', () => {

        render(
            <UserContext.Provider value={{user: null}}>
                <HomePage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('pre'); //aria-label

        expect( preTag.innerHTML ).toBe( 'null' );
    })

    test('sould display component with the user', () => {

        render(
            <UserContext.Provider value={{user}}>
                <HomePage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('pre'); //aria-label

        expect( preTag.innerHTML ).toContain( `${user.id}` ); // en el html es un string el id
        expect( preTag.innerHTML ).toContain( user.name );
    })
})