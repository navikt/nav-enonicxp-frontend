import React, { useEffect, useState } from 'react';
import { useLoginState } from '../../../store/hooks/useLoginState';
import { AuthState } from '../../../store/slices/loginState';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { EditorHelp } from '../editor-help/EditorHelp';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './AuthDependantRender.less';

type Props = {
    renderOn: AuthState | 'always';
    children: React.ReactNode;
};

export const AuthDependantRender = ({
    children,
    renderOn = 'always',
}: Props) => {
    const { pageConfig } = usePageConfig();
    const { authState } = useLoginState();
    const [shouldRender, setShouldRender] = useState(renderOn === 'always');

    useEffect(() => {
        setShouldRender(renderOn === 'always' || renderOn === authState);
    }, [renderOn, authState]);

    // Always render components in editor view
    if (!!pageConfig.editorView) {
        return (
            <>
                {renderOn === 'loggedIn' ? (
                    <EditorHelp
                        text={
                            'Komponenten under vises kun for innlogget bruker'
                        }
                        type={'info'}
                    />
                ) : renderOn === 'loggedOut' ? (
                    <EditorHelp
                        text={
                            'Komponenten under vises kun for uinnlogget bruker'
                        }
                        type={'info'}
                    />
                ) : null}
                {children}
            </>
        );
    }

    // If login state has not yet been determined, render a placeholder for logged out
    // components, and nothing for logged in components
    if (authState === 'waiting') {
        if (renderOn === 'loggedIn') {
            return null;
        }

        if (renderOn === 'loggedOut') {
            return (
                <div className={'auth-waiting'}>
                    <div className={'auth-waiting__placeholder'}>
                        <NavFrontendSpinner />
                    </div>
                    {children}
                </div>
            );
        }
    }

    return shouldRender ? <>{children}</> : null;
};
