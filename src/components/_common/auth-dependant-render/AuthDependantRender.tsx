import React, { useLayoutEffect, useState } from 'react';
import { useAuthState } from '../../../store/hooks/useAuthState';
import { AuthStateType } from '../../../store/slices/authState';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

// Hack to prevent irrelevant React warning for useLayoutEffect server-side
const useLayoutEffectClientSide =
    typeof window !== 'undefined' ? useLayoutEffect : () => {};

type Props = {
    renderOn: AuthStateType | 'always';
    children: React.ReactNode;
};

export const AuthDependantRender = ({
    children,
    renderOn = 'always',
}: Props) => {
    const { pageConfig } = usePageConfig();
    const { authState } = useAuthState();
    const [shouldRender, setShouldRender] = useState(renderOn !== 'loggedIn');

    useLayoutEffectClientSide(() => {
        if (authState !== 'waiting') {
            setShouldRender(renderOn === 'always' || renderOn === authState);
        }
    }, [renderOn, authState]);

    // Always render components in editor view
    if (pageConfig.editorView === 'edit') {
        return <>{children}</>;
    }

    // Do not render components for logged in users until auth-state
    // has been confirmed
    if (authState === 'waiting' && renderOn === 'loggedIn') {
        return null;
    }

    return shouldRender ? <>{children}</> : null;
};
