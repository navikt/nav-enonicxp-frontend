import React from 'react';
import { Heading } from '@navikt/ds-react';
import { AlertBox } from '@/nextjs/components/_common/alertBox/AlertBox';

export const LayersEditorWarning = () => {
    return (
        <AlertBox variant={'warning'}>
            <Heading level={'2'} size={'small'}>
                {'Merk! Skal kun redigeres i "topplaget".'}
            </Heading>
        </AlertBox>
    );
};
