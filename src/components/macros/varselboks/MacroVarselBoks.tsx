import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { VarselBoksMacroProps } from '../../../types/macro-props/varselBoks';

export const MacroVarselBoks = ({ config }: VarselBoksMacroProps) => {
    if (!config?.varselBoks) {
        return null;
    }

    const { varselBoks } = config.varselBoks;

    return <AlertStripe type={'advarsel'}>{varselBoks}</AlertStripe>;
};
