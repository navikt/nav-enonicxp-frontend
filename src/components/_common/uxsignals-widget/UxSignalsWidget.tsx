import React from 'react';
import Script from 'next/script';

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import style from './UxSignalsWidget.module.scss';

type Props = {
    embedCode: string;
};

export const UxSignalsWidget = ({ embedCode }: Props) => {
    return (
        <>
            <Script
                type={'module'}
                src={'https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js'}
                async={true}
            />
            <div data-uxsignals-embed={embedCode} className={style.uxSignalsWidget} />
            <EditorHelp text={'UX Signals rekrutterings-widget'} type={'info'} />
        </>
    );
};
