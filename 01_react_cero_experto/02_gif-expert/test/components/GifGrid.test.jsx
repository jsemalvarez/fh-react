const { render, screen } = require("@testing-library/react")
const { GifGrid } = require("../../src/components/GifGrid")
const { useFetchGifs } = require("../../src/hooks/useFetchGifs")

jest.mock('../../src/hooks/useFetchGifs')

describe('GifGrid', () => {

    test('should display loading when isLoading is true', () => {

        useFetchGifs.mockReturnVale({
            images: [],
            isLoading: true
        })

        const mockCategory = 'One Punch';

        render( <GifGrid category={ mockCategory } /> )

        expect( screen.getByText( 'Cargando...' ))
        expect( screen.getByText( mockCategory ))
    })

})