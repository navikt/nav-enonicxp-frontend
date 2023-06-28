import React from 'react';
import Head from 'next/head';
import { ErrorProps } from 'types/content-props/error-props';
import { ErrorContent404 } from './errorcode-content/ErrorContent404';
import { ErrorContentDefault } from './errorcode-content/ErrorContentDefault';
import { ErrorContent408 } from './errorcode-content/ErrorContent408';
import { ErrorContent400 } from './errorcode-content/ErrorContent400';
import { Ingress, Heading } from '@navikt/ds-react';

import style from './ErrorPage.module.scss';

const errorContentByCode: {
    [key: number]: React.FunctionComponent<ErrorProps>;
} = {
    400: ErrorContent400,
    404: ErrorContent404,
    408: ErrorContent408,
};

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;

    const ErrorContent = errorContentByCode[errorCode] || ErrorContentDefault;

    return (
        <div className={style.errorPage}>
            <Head>
                <style type={'text/css'}>
                    {
                        // Skjuler andre brødsmuleledd for feilsider (privatperson/etc)
                        '.brodsmulesti li:nth-child(2):not(:last-child) {display: none;}'
                    }
                </style>
            </Head>
            <div className={style.header}>
                <Heading level="1" size="large" className={style.headerMsg}>
                    {errorMessage}
                </Heading>
                <Ingress>{`Statuskode ${errorCode}`}</Ingress>
            </div>
            <div className={style.content}>
                <ErrorContent {...props} />
            </div>
        </div>
    );
};
