import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { onChecking, onClearErrorMessage, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        try {
            dispatch( onChecking )
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            },100)
        }
    }

    const startRegister = async({ name, email, password }) => {
        try {
            dispatch( onChecking )
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout(error.response.data.msg) );
            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            },100)
        }
    }

    const startCheckAuthToken = async() => {
        let token = localStorage.getItem('token');

        if( !token ) return dispatch( onLogout() )
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            localStorage.clear()
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch( onLogout() )
    }

    return {
        status, 
        user, 
        errorMessage,
        startLogin,
        startRegister,
        startCheckAuthToken,
        startLogout
    }
}