import React from 'react';
import { Heading } from '@navikt/ds-react';
import { Varselboks } from 'components/_common/varselboks/Varselboks';

export const LayersEditorWarning = () => {
    return (
        <Varselboks variant={'warning'}>
            <Heading level={'2'} size={'small'}>
                {'Merk! Skal kun redigeres i "topplaget".'}
            </Heading>
        </Varselboks>
    );
};
