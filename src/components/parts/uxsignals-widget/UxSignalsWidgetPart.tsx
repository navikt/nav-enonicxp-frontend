import React from 'react';
import { UxSignalsWidgetPartProps } from 'types/component-props/parts/uxsignals-widget';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import Script from 'next/script';

import style from './UxSignalsWidgetPart.module.scss';

export const UxSignalsWidgetPart = ({ config }: UxSignalsWidgetPartProps) => {
    if (!config) {
        return <EditorHelp text={'Tom komponent'} type={'error'} />;
    }

    const { embedCode } = config;

    if (!embedCode) {
        return <EditorHelp text={'Embed-kode mangler'} type={'error'} />;
    }

    return (
        <>
            <Script
                type={'module'}
                src={
                    'https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js'
                }
                async={true}
            />
            <div
                data-uxsignals-embed={embedCode}
                className={style.uxSignalsWidget}
            />
            <EditorHelp
                text={'UX Signals rekrutterings-widget'}
                type={'info'}
            />
        </>
    );
};
