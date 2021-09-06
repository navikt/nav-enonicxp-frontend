import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../../store/hooks/useAuthState';
import { AuthStateType } from '../../../store/slices/authState';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BEM } from '../../../utils/classnames';
import './AuthDependantRender.less';

const bem = BEM('auth-waiting');

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
    const [shouldRender, setShouldRender] = useState(renderOn === 'always');

    useEffect(() => {
        setShouldRender(renderOn === 'always' || renderOn === authState);
    }, [renderOn, authState]);

    // Always render components in editor view
    if (pageConfig.editorView === 'edit') {
        return <>{children}</>;
    }

    // If auth state has not yet been determined, render a placeholder for logged out
    // components, and nothing for logged in components
    if (authState === 'waiting') {
        if (renderOn === 'loggedIn') {
            return null;
        }

        if (renderOn === 'loggedOut') {
            return (
                <div className={bem()}>
                    <div className={bem('placeholder')}>
                        <NavFrontendSpinner />
                    </div>
                    {children}
                </div>
            );
        }
    }

    return shouldRender ? <>{children}</> : null;
};
