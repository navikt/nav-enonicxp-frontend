import React from 'react';
import { InfoBoksMacroProps } from '../../../types/macro-props/infoBoks';
import AlertStripe from 'nav-frontend-alertstriper';

export const MacroInfoBoks = ({ config }: InfoBoksMacroProps) => {
    if (!config?.infoBoks) {
        return null;
    }

    const { infoBoks } = config.infoBoks;

    return <AlertStripe type={'info'}>{infoBoks}</AlertStripe>;
};
