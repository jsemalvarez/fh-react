import { render, screen } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";


describe('GiftItem', () => {

    const title = 'Saitama';
    const url = 'https://one-punch.com/saitama.jpg';

    test('Should be to match with snapshot', () => {

        const { container } = render( <GifItem title={title} url={url} /> );

        expect( container ).toMatchSnapshot();
    })

    test('Should display the image with the specified URL and ALT text', () => {

        render( <GifItem title={title} url={url} /> );
        const { src, alt } = screen.getByRole('img')

        expect( src ).toBe( url )
        expect( alt ).toBe( title )
    })

    test('should display the title in the component', () => {

        render(<GifItem title={ title} url={ url } />)

        expect(screen.getByText(title)).toBeTruthy()
    })
    
})