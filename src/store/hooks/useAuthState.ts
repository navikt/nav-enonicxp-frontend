import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthState } from '../slices/authState';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthState = (): AuthState => {
    return useAppSelector((state) => state.authState);
};
