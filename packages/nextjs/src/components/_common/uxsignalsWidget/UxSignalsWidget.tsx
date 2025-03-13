import React, { useEffect } from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

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

export const UxSignalsWidget = ({ embedCode }: UxSignalsWidgetProps) => {
    // If the cookie banner is visible, the user has not taken any action yet.
    // Wait and see if the user takes action before adding the script if consent is given..
    const checkConsentOrWait = ({ consent, userActionTaken }: Consent) => {
        if (consent.surveys && consent.analytics) {
            addUXSignalsScript();
            return;
        }
        if (!userActionTaken) {
            setTimeout(() => {
                console.log('waiting...');
                checkConsentOrWait(getCurrentConsent());
            }, 1000);
        }

        console.log('no consent or user action taken');
    };

    const addUXSignalsScript = () => {
        if (document.querySelector(`script[src="${uxSignalsScriptUrl}"]`)) {
            return;
        }

        console.log('adding script');

        const script = document.createElement('script');
        script.src = uxSignalsScriptUrl;
        script.async = true;
        document.body.appendChild(script);
    };

    const removeUXSignalsScript = () => {
        console.log('removing script');
        const script = document.querySelector(`script[src="${uxSignalsScriptUrl}"]`);
        if (script) {
            document.body.removeChild(script);
        }
    };

    useEffect(() => {
        const consent = getCurrentConsent();
        checkConsentOrWait(consent);
        return () => {
            removeUXSignalsScript();
        };
    }, []);

    return (
        <>
            <div data-uxsignals-embed={embedCode} className={style.uxSignalsWidget} />
            <EditorHelp text={'UX Signals rekrutterings-widget'} type={'info'} />
        </>
    );
};
