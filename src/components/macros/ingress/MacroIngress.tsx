import React from 'react';
import { MacroIngressProps } from '../../../types/macro-props/ingress';
import { Normaltekst } from 'nav-frontend-typografi';
import './MacroIngress.less';

export const MacroIngress = ({ config }: MacroIngressProps) => {
    if (!config?.ingress) {
        return null;
    }

    const { body } = config.ingress;

    return <Normaltekst className={'macro-ingress'}>{body}</Normaltekst>;
};
