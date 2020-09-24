import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './FallbackPage.less';
import { Undertittel } from 'nav-frontend-typografi';

export const FallbackPage = () => {
    return (
        <div className={'fallback-page'}>
            <div className={'fallback-page__spinner'}>
                <NavFrontendSpinner />
            </div>
            <Undertittel>{'Laster side-innhold...'}</Undertittel>
        </div>
    );
};
