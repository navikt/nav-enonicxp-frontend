import React from 'react';
import { ErrorProps } from 'types/content-props/error-props';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { Error404Content } from './errorcode-content/Error404Content';
import { Error1337ReloadOnDevBuildError } from './errorcode-content/Error1337ReloadOnDevBuildError';
import { BEM } from '../../../utils/bem';
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
                <title>{`${errorMessage} - nav.no`}</title>
                <style type={'text/css'}>
                    {
                        '.brodsmulesti li:nth-child(2):not(:last-child) {display: none;}'
                    }
                </style>
            </Head>
            <div className={bem('header')}>
                <Innholdstittel className={bem('header-msg')}>
                    {errorMessage}
                </Innholdstittel>
                <Ingress
                    className={bem('header-code')}
                >{`Feilkode ${errorCode}`}</Ingress>
            </div>
            <div className={bem('content')}>
                <ErrorContent code={errorCode} />
            </div>
        </div>
    );
};
