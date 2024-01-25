import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getTokenFromCookies = () => {
  return cookies.get('token') || null;
};