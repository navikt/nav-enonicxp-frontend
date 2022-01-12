import React from 'react';
import { Heading, Loader } from '@navikt/ds-react';

export const FallbackPage = () => {
    return (
        <div className={'fallback-page'}>
            <div className={'fallback-page__spinner'}>
                <Loader size={'2xlarge'} />
            </div>
            <Heading level="1" size="medium">
                {'Laster side-innhold...'}
            </Heading>
        </div>
    );
};
