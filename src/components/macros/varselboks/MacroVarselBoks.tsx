import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { MacroVarselBoksProps } from '../../../types/macro-props/varselBoks';
import { ParsedHtml } from '../../ParsedHtml';

export const MacroVarselBoks = ({ config }: MacroVarselBoksProps) => {
    if (!config?.varselBoks) {
        return null;
    }

    // TODO: this should only be plain text, but it seems to be used
    // with HTML by some editors
    const { varselBoks } = config.varselBoks;

    return (
        <AlertStripe type={'advarsel'}>
            <ParsedHtml htmlProps={varselBoks} />
        </AlertStripe>
    );
};
