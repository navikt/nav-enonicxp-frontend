import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useLoginState = () => {
    return useSelector<RootState>((state) => state.loginState);
};
