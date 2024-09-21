export const getGifs = async( category ) => {

    const GIFT_API_KEY = import.meta.env.VITE_GIFT_API_KEY

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${ GIFT_API_KEY }&q=${ category }&limit=10`;
    const resp = await fetch( url );
    const { data } = await resp.json();

    const gifs = data.map( img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }));
    
    return gifs;
}