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

    test('should display the gifs when useFetchGifs return images ', () => {

        const mockImages = [
            {
                id: 'ABC',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg'
            },
            {
                id: '123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
            },
        ]

        useFetchGifs.mockReturnVale({
            images: mockImages,
            isLoading: false
        })

        const mockCategory = 'One Punch';

        render( <GifGrid category={ mockCategory } /> )

        expect( screen.getAllByRole('img').length ).toBe( 2 )
    })

})