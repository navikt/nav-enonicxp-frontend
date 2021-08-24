import React from 'react';
import { Title } from '@navikt/ds-react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './FallbackPage.less';

export const FallbackPage = () => {
    return (
        <div className={'fallback-page'}>
            <div className={'fallback-page__spinner'}>
                <NavFrontendSpinner />
            </div>
            <Title level={1} size="m">
                {'Laster side-innhold...'}
            </Title>
        </div>
    );
};
