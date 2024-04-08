import React, { useState } from 'react';
import { useAuthState } from 'store/hooks/useAuthState';
import { AuthStateType } from 'store/slices/authState';
import { usePageContentProps } from 'store/pageContext';
import { useLayoutEffectClientSide } from 'utils/react';

// eslint does not understand bracket notation
// eslint-disable-next-line css-modules/no-unused-class
import style from './AuthDependantRender.module.scss';

export const editorAuthstateClassname = (authState: AuthStateType) => style[authState];

type Props = {
    renderOn: AuthStateType | 'always';
    children: React.ReactNode;
};

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
