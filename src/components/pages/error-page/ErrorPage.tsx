import React from 'react';
import { ErrorProps } from 'types/content-props/error-props';
import { Ingress, Heading } from '@navikt/ds-react';
import { ErrorContent404 } from './errorcode-content/ErrorContent404';
import { ErrorContent1337 } from './errorcode-content/ErrorContent1337';
import { ErrorContentDefault } from './errorcode-content/ErrorContentDefault';
import { ErrorContent408 } from './errorcode-content/ErrorContent408';
import { BEM } from '../../../utils/classnames';
import Head from 'next/head';
import { ErrorContent400 } from './errorcode-content/ErrorContent400';

const bem = BEM('error-page');

const errorContentByCode: {
    [key: number]: React.FunctionComponent<ErrorProps>;
} = {
    400: ErrorContent400,
    404: ErrorContent404,
    408: ErrorContent408,
    1337: ErrorContent1337,
};

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;

    const ErrorContent = errorContentByCode[errorCode] || ErrorContentDefault;

    return (
        <div className={bem()}>
            <Head>
                <style type={'text/css'}>
                    {
                        // Skjuler andre brødsmuleledd for feilsider (privatperson/etc)
                        '.brodsmulesti li:nth-child(2):not(:last-child) {display: none;}'
                    }
                </style>
            </Head>
            <div className={bem('header')}>
                <Heading level="1" size="large" className={bem('header-msg')}>
                    {errorMessage}
                </Heading>
                <Ingress
                    className={bem('header-code')}
                >{`Statuskode ${errorCode}`}</Ingress>
            </div>
            <div className={bem('content')}>
                <ErrorContent {...props} />
            </div>
        </div>
    );
};
