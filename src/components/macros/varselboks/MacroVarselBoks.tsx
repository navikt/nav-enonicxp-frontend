import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { MacroVarselBoksProps } from '../../../types/macro-props/varselBoks';

export const MacroVarselBoks = ({ config }: MacroVarselBoksProps) => {
    if (!config?.varselBoks) {
        return null;
    }

    const { varselBoks } = config.varselBoks;

    return <AlertStripe type={'advarsel'}>{varselBoks}</AlertStripe>;
};
