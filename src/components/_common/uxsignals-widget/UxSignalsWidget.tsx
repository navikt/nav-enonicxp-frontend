import React, { Fragment } from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import Script from 'next/script';

import style from './UxSignalsWidget.module.scss';

type Props = {
    embedCode: string;
};

export const UxSignalsWidget = ({ embedCode }: Props) => {
    return (
        <Fragment key={embedCode}>
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
        </Fragment>
    );
};
