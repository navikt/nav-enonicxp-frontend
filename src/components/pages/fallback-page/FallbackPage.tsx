import React from 'react';
import { Heading, Loader } from '@navikt/ds-react';

import style from './FallbackPage.module.scss';

export const FallbackPage = () => {
    return (
        <div className={style.fallbackPage}>
            <Loader size={'2xlarge'} />
            <Heading level="1" size="medium">
                {'Laster side-innhold...'}
            </Heading>
        </div>
    );
};
