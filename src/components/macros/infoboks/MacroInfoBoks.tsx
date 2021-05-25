import React from 'react';
import { MacroInfoBoksProps } from '../../../types/macro-props/infoBoks';
import AlertStripe from 'nav-frontend-alertstriper';

export const MacroInfoBoks = ({ config }: MacroInfoBoksProps) => {
    if (!config?.infoBoks) {
        return null;
    }

    const { infoBoks } = config.infoBoks;

    return <AlertStripe type={'info'}>{infoBoks}</AlertStripe>;
};
