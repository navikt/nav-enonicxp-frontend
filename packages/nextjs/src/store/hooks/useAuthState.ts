import { useAppSelector } from 'store/store';
import { AuthState } from 'store/slices/authState';

export const useAuthState = (): AuthState => {
    return useAppSelector((state) => state.authState);
};
