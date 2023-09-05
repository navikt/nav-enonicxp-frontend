import { useAppSelector } from '../store';
import { AuthState } from '../slices/authState';

export const useAuthState = (): AuthState => {
    return useAppSelector((state) => state.authState);
};
