import React from 'react';
import { MacroGlobalValueProps } from '../../../types/macro-props/global-value';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    if (!config?.global_value) {
        return null;
    }

    const { value } = config.global_value;

    return <>{value || '[teknisk feil: verdi ikke tilgjengelig]'}</>;
};
