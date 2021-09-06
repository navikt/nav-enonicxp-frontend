import { fetchWithTimeout } from './fetch-utils';
import { setAuthStateAction } from '../store/slices/authState';
import { store } from '../store/store';

type AuthResponse =
    | {
          authenticated: true;
          name: string;
          securityLevel: '4' | '3';
      }
    | { authenticated: false };

export const fetchAndSetAuthStatus = () => {
    fetchWithTimeout(process.env.INNLOGGINGSTATUS_URL, 2000, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(
                `Bad response from auth api: ${res.status} - ${res.statusText}`
            );
        })
        .then((json: AuthResponse) => {
            store.dispatch(
                setAuthStateAction({
                    authState: json.authenticated ? 'loggedIn' : 'loggedOut',
                })
            );
        })
        .catch((e) => {
            console.error(`Error while fetching auth status: ${e}`);
            store.dispatch(setAuthStateAction({ authState: 'loggedOut' }));
        });
};
