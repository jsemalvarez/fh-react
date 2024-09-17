const { render, screen } = require("@testing-library/react")
const { FirstApp } = require("../src/FirstApp")

describe('FirstApp.jsx',() => {

    // no se recomienda hacer test de snapshot cuando estamos desarrollando la app
    // test('should be to match with the snapshot',() => {
    //     const title = "Soy josema"
    //     const { container } = render( <FirstApp title={title} /> )
    //     expect( container ).toMatchSnapshot()
    // })

    test('should display title in h1 tag',() => {
        const title = "Soy josema"
        const { getByText } = render( <FirstApp title={title} /> )
        expect( getByText(title)).toBeTruthy()
    })

    // este tipo de pruebas, no es recomendable porque son poco flexibles, 
    // ya que el h1 puede cambiar a un h2 o a un <p>
    test('should display title in h1 tag',() => {
        const title = "Soy josema"
        const { container } = render( <FirstApp title={title} /> )

        const h1 = container.querySelector('h1')
        expect(h1.innerHTML).toBe( title )
        // en el caso de que tenga espacios uno de los titulos,
        // el test pasa
        expect(h1.innerHTML).toContain( title )
    })

    test('should display title in h1 tag',() => {
        const title = "Soy josema"
        const { getByTestId } = render( <FirstApp title={title} /> )

        expect( getByTestId('test-title') ).toBeTruthy();
        expect( getByTestId('test-title').innerHTML ).toBe( title );
        expect( getByTestId('test-title').innerHTML ).toContain( title );
    })

    test('should display the subtitle thats comes int the props', ()=> {
        const title = "Soy josema"
        const subtitle = "titulo secundario"

        const { getByText, getAllByText } = render( <FirstApp title={title} subTitle={subtitle} />)

        expect( getByText(subtitle) ).toBeTruthy();
        expect( getAllByText(subtitle).length ).toBe(2);
    })

    test('should display title in h1 tag', () => {
        const title = "Soy josema";
        const subtitle = "titulo secundario"
        render( <FirstApp title={title} subTitle={subtitle} />)

        // screen.debug // para ver el objeto
        expect( screen.getByText(title) ).toBeTruthy(); 
        expect( screen.getByRole('heading', {level: 1}).innerHTML ).toContain(title);
    })

    test('should display the subtitle thats comes int the props', ()=> {
        const title = "Soy josema"
        const subtitle = "titulo secundario"

        render( <FirstApp title={title} subTitle={subtitle} />)

        expect( screen.getByText(subtitle) ).toBeTruthy();
        expect( screen.getAllByText(subtitle).length ).toBe(1);
    })

})