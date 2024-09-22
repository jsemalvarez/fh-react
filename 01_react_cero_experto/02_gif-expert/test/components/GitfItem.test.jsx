import { render } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";


describe('GiftItem', () => {

    const title = 'Saitama';
    const url = 'https://one-punch.com/saitama.jpg';

    test('Should be to match with snapshot', () => {

        const {container} = render( <GifItem title={title} url={url} /> );

        expect( container ).toMatchSnapshot();
    })
})