import React from 'react';
import { ErrorProps } from 'types/content-props/error-props';
import { Title, Ingress } from '@navikt/ds-react';
import { Error404Content } from './errorcode-content/Error404Content';
import { Error1337ReloadOnDevBuildError } from './errorcode-content/Error1337ReloadOnDevBuildError';
import { BEM } from '../../../utils/classnames';
import Head from 'next/head';
import './ErrorPage.less';

const bem = BEM('error-page');

const ErrorContent = ({ code }: { code: number }) =>
    ({
        404: <Error404Content />,
        1337: <Error1337ReloadOnDevBuildError />,
    }[code] || null);

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;
    const message = `Error code ${errorCode} - ${errorMessage}`;

    console.error(message);

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
                <Title level={1} size="xl" className={bem('header-msg')}>
                    {errorMessage}
                </Title>
                <Ingress
                    className={bem('header-code')}
                >{`Statuskode ${errorCode}`}</Ingress>
            </div>
            <div className={bem('content')}>
                <ErrorContent code={errorCode} />
            </div>
        </div>
    );
};
