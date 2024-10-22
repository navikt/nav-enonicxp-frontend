import React, { useEffect } from 'react';
import { EditorHelp } from '@/editor-tools/src/components/editor-help/EditorHelp';

import style from './UxSignalsWidget.module.scss';

type Props = {
    embedCode: string;
};

export const UxSignalsWidget = ({ embedCode }: Props) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    });

    return (
        <>
            <div data-uxsignals-embed={embedCode} className={style.uxSignalsWidget} />
            <EditorHelp text={'UX Signals rekrutterings-widget'} type={'info'} />
        </>
    );
};
