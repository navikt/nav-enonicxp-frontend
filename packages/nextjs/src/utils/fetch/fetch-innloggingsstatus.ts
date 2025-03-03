import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { setAuthStateAction } from 'store/slices/authState';
import { store } from 'store/store';

type InnloggingsstatusResponse =
    | {
          authenticated: true;
          name: string;
          securityLevel: '4' | '3';
      }
    | { authenticated: false };

export const fetchAndSetInnloggingsstatus = () =>
    fetchJson<InnloggingsstatusResponse>(process.env.INNLOGGINGSSTATUS_URL, 5000, {
        credentials: 'include',
    }).then((res) => {
        if (!res) {
            logger.error('Failed to fetch innloggingsstatus');
            store.dispatch(setAuthStateAction({ authState: 'loggedOut' }));
            return null;
        }

        store.dispatch(
            setAuthStateAction(
                res.authenticated
                    ? {
                          authState: 'loggedIn',
                          name: res.name,
                      }
                    : { authState: 'loggedOut' }
            )
        );

        return res;
    });
