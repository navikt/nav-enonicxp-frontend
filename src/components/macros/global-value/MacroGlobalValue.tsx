import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { MacroGlobalValueProps } from '../../../types/macro-props/global-value';

import { formatNumber, isOnlyDigits } from '../../../utils/math';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    const { language } = usePageConfig();
    if (!config?.global_value) {
        return null;
    }

    const { value } = config.global_value;

    if (!value) {
        return <>[teknisk feil: verdi ikke tilgjengelig]</>;
    }

    if (!isOnlyDigits(value)) {
        console.log('was not only digits', value);
        return value;
    }

    const number = parseInt(value, 10);
    return formatNumber(number, 0, language);
};
