import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MacroIngressProps } from 'types/macro-props/ingress';

export const MacroIngress = ({ config }: MacroIngressProps) => {
    if (!config?.ingress) {
        return null;
    }

    const { body } = config.ingress;

    return (
        <BodyLong size={'large'} spacing>
            {body}
        </BodyLong>
    );
};
