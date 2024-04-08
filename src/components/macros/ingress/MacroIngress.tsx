import React from 'react';
import { Ingress } from '@navikt/ds-react';
import { MacroIngressProps } from 'types/macro-props/ingress';

export const MacroIngress = ({ config }: MacroIngressProps) => {
    if (!config?.ingress) {
        return null;
    }

    const { body } = config.ingress;

    return <Ingress spacing>{body}</Ingress>;
};
