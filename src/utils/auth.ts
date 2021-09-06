import { fetchWithTimeout } from './fetch-utils';
import { setLoginStateAction } from '../store/slices/loginState';

export const fetchAndSetAuthStatus = () => {
    fetchWithTimeout(`${process.env.APP_ORIGIN}/api/auth`, 1000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(
                `Bad response from auth api: ${res.status} - ${res.statusText}`
            );
        })
        .then((json) => {
            setLoginStateAction({ isLoggedIn: json.isLoggedIn });
        })
        .catch((e) => {
            console.error(`Error while fetching auth status: ${e}`);
            setLoginStateAction({ isLoggedIn: false });
        });
};
