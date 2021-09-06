import { fetchWithTimeout } from './fetch-utils';
import { setLoginStateAction } from '../store/slices/loginState';
import { store } from '../store/store';

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
            store.dispatch(
                setLoginStateAction({
                    authState: json.isLoggedIn ? 'loggedIn' : 'loggedOut',
                })
            );
        })
        .catch((e) => {
            console.error(`Error while fetching auth status: ${e}`);
            store.dispatch(setLoginStateAction({ authState: 'loggedOut' }));
        });
};
