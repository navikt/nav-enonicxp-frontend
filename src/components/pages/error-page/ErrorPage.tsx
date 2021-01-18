import React, { useEffect } from 'react';
import { ErrorProps } from 'types/content-props/error-props';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { Error404Content } from './errorcode-content/Error404Content';
import { Error1337Content } from './errorcode-content/Error1337Content';
import { BEM } from '../../../utils/bem';
import './ErrorPage.less';

const bem = BEM('error-page');

const ErrorContent = ({ code }: { code: number }) =>
    ({ 404: <Error404Content />, 1337: <Error1337Content /> }[code] || null);

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;
    const message = `Error code ${errorCode} - ${errorMessage}`;

    console.error(message);

    useEffect(() => {
        setBreadcrumbs([
            {
                handleInApp: true,
                title: errorMessage,
                url: '/',
            },
        ]);
    }, [errorMessage]);

    return (
        <div className={bem()}>
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
