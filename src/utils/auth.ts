import { fetchWithTimeout } from './fetch-utils';
import { setLoginStateAction } from '../store/slices/loginState';

export const fetchAndSetAuthStatus = () => {
    fetchWithTimeout(`${process.env.APP_ORIGIN}/api/auth`, 1000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            console.error('Could not fetch auth');
            setLoginStateAction({ isLoggedIn: false });
        })
        .then((json) => {
            setLoginStateAction({ isLoggedIn: json.isLoggedIn });
        });
};
