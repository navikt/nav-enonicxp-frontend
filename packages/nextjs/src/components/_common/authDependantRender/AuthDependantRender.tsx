import React, { PropsWithChildren, useState } from 'react';
import { useAuthState } from 'store/hooks/useAuthState';
import { AuthStateType } from 'store/slices/authState';
import { usePageContentProps } from 'store/pageContext';
import { useLayoutEffectClientSide } from 'utils/react';

type Props = PropsWithChildren<{
    renderOn: AuthStateType | 'always';
}>;

export const AuthDependantRender = ({ children, renderOn = 'always' }: Props) => {
    const { editorView } = usePageContentProps();
    const { authState } = useAuthState();
    const [shouldRender, setShouldRender] = useState(renderOn !== 'loggedIn');

    useLayoutEffectClientSide(() => {
        if (authState !== 'waiting') {
            setShouldRender(renderOn === 'always' || renderOn === authState);
        }
    }, [renderOn, authState]);

    // Always render components in editor view
    if (editorView === 'edit') {
        return <>{children}</>;
    }

    // Do not render components for logged in users until auth-state
    // has been confirmed
    if (authState === 'waiting' && renderOn === 'loggedIn') {
        return null;
    }

    return shouldRender ? <>{children}</> : null;
};
