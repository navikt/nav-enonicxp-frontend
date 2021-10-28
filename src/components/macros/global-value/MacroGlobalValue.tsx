import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { MacroGlobalValueProps } from '../../../types/macro-props/global-value';
import { formatNumber, isStringOnlyNumber } from '../../../utils/math';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    const { language } = usePageConfig();
    if (!config?.global_value) {
        return null;
    }

    const { value } = config.global_value;

    if (!value) {
        return <>[teknisk feil: verdi ikke tilgjengelig]</>;
    }

    // This is a failsafe. Value should normally be digits and decimal separator only.
    if (!isStringOnlyNumber(value)) {
        return <>{value}</>;
    }

    const number = parseFloat(value);
    return <>{formatNumber(number, 2, language)}</>;
};
