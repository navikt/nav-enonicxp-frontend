import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';
import { LoginState } from '../slices/loginState';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLoginState = (): LoginState => {
    return useAppSelector((state) => state.loginState);
};
