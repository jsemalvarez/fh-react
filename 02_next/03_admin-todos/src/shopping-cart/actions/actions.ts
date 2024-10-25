import { getCookie, hasCookie, setCookie } from "cookies-next"

const cookieName = 'cart';

export const getCookieCart = (): { [id: string] : number} => {

    if( hasCookie(cookieName) ){
        const cookieCart = JSON.parse( getCookie(cookieName) ?? '{}');
        return cookieCart;
    }

    return {}
}

export const addProductToCart = ( id: string ) => {

    const cookieCart = getCookieCart();

    if( cookieCart[id] ){
        cookieCart[id] = cookieCart[id] + 1;
    }else{
        cookieCart[id] = 1
    }

    setCookie( cookieName, JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {

    const cookieCart = getCookieCart();

    if( cookieCart[id] ){
        delete cookieCart[id]
    }

    setCookie( cookieName, JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string ) => {

    const cookieCart = getCookieCart();

    const hasSelectedItem = !!cookieCart[id];
    if( !hasSelectedItem ) return;

    const totlaSelectedItem = cookieCart[id] - 1;

    if( totlaSelectedItem <= 0){
        delete cookieCart[id];
    }else{
        cookieCart[id] = totlaSelectedItem;
    }

    setCookie( cookieName, JSON.stringify(cookieCart));
}