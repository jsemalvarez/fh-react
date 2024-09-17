const { render } = require("@testing-library/react")
const { FirstApp } = require("../src/FirstApp")

describe('FirstApp.jsx',() => {

    test('should be to match with the snapshot',() => {
        const title = "Soy josema"
        const { container } = render( <FirstApp title={title} /> )
        expect( container ).toMatchSnapshot()
    })

    test('should show title in h1 tag',() => {
        const title = "Soy josema"
        const { container, getByText } = render( <FirstApp title={title} /> )
        expect( getByText(title)).toBeTruthy()
    })

    test('should show title in h1 tag',() => {
        const title = "Soy josema"
        const { container, getByText } = render( <FirstApp title={title} /> )

        const h1 = container.querySelector('h1')
        expect(h1.innerHTML).toBe( title )
        expect(h1.innerHTML).toContain( title )
    })

})