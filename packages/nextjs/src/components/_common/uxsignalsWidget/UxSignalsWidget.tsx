import React, { useEffect } from 'react';
import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';
import { ErrorBoundary } from 'react-error-boundary';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

import style from './UxSignalsWidget.module.scss';

type UxSignalsWidgetProps = {
    embedCode: string;
};

type Consent = {
    consent: {
        analytics: boolean;
        surveys: boolean;
    };
    userActionTaken: boolean;
};

const uxSignalsScriptUrl = 'https://widget.uxsignals.com/embed.js';
let scriptAddTimeout: ReturnType<typeof setTimeout>;

export const UxSignalsWidgetComponent = ({ embedCode }: UxSignalsWidgetProps) => {
    // If the cookie banner is visible, the user has not taken any action yet.
    // Wait and see if the user takes action before adding the script if consent is given..
    const checkConsentOrWait = (tries: number = 0) => {
        const { consent, userActionTaken }: Consent = getCurrentConsent();
        if (consent.surveys && consent.analytics) {
            addUXSignalsScript();
            return;
        }
        // Wait max 60 seconds for user respond to the cookie banner
        // (userActionTaken) or give up.
        if (!userActionTaken && tries < 60) {
            scriptAddTimeout = setTimeout(() => {
                checkConsentOrWait(tries + 1);
            }, 1000);
        }
    };

    const addUXSignalsScript = () => {
        if (document.querySelector(`script[src="${uxSignalsScriptUrl}"]`)) {
            return;
        }

        const script = document.createElement('script');
        script.src = uxSignalsScriptUrl;
        script.async = true;
        document.body.appendChild(script);
    };

    const removeUXSignalsScript = () => {
        const script = document.querySelector(`script[src="${uxSignalsScriptUrl}"]`);
        if (script) {
            document.body.removeChild(script);
        }
    };

    useEffect(() => {
        // throw new Error('Test error for Error Boundary');

        checkConsentOrWait();
        return () => {
            if (scriptAddTimeout) {
                clearTimeout(scriptAddTimeout);
            }
            removeUXSignalsScript();
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <aside>
            <div data-uxsignals-embed={embedCode} className={style.uxSignalsWidget} />
            <EditorHelp text={'UX Signals rekrutterings-widget'} type={'info'} />
        </aside>
    );
};

export const UxSignalsWidget = ({ embedCode }: UxSignalsWidgetProps) => (
    <ErrorBoundary fallback={'test'}>
        <UxSignalsWidgetComponent embedCode={embedCode} />
    </ErrorBoundary>
);
