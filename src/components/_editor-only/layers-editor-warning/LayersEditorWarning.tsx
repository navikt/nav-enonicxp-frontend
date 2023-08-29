import React from 'react';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { Heading } from '@navikt/ds-react';

export const LayersEditorWarning = () => {
    return (
        <AlertBox variant={'warning'}>
            <Heading level={'2'} size={'small'}>
                {'Merk! Skal kun redigeres i "topplaget".'}
            </Heading>
        </AlertBox>
    );
};
