import React, { useEffect } from 'react';
import { ErrorProps } from '../../../types/content-types/error-props';
import { Normaltekst } from 'nav-frontend-typografi';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import './ErrorPage.less';

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;
    const message = `Error! ${errorMessage}${
        errorCode ? ` - Error code ${errorCode}` : ''
    }`;

    // Temp during development
    console.error(message);

    useEffect(() => {
        setBreadcrumbs([
            {
                title: 'This page could not be found',
                url: '/',
            },
        ]);
    }, [errorCode]);

    return (
        <div className={'error-page'}>
            <h1 className={`error-page__status`}>404</h1>
            <h2 className={`error-page__message`}>
                <Normaltekst>This page could not be found.</Normaltekst>
            </h2>
        </div>
    );
};
