import cookie from 'js-cookie';
import { ITokens } from '../interfaces/IUserData';

export const getCookies = (): ITokens => {
    const token = cookie.get('token');

    return { token };
};

export const removeCookies = () => {
    cookie.remove('token');
};