import React from 'react';
import { Heading } from '@navikt/ds-react';
import NavFrontendSpinner from 'nav-frontend-spinner';

export const FallbackPage = () => {
    return (
        <div className={'fallback-page'}>
            <div className={'fallback-page__spinner'}>
                <NavFrontendSpinner />
            </div>
            <Heading level="1" size="medium">
                {'Laster side-innhold...'}
            </Heading>
        </div>
    );
};
