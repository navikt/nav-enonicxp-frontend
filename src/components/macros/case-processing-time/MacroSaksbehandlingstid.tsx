import React from 'react';
import { MacroCaseProcessingTimeProps } from '../../../types/macro-props/case-processing-time';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { translator } from '../../../translations';

export const MacroSaksbehandlingstid = ({
    config,
}: MacroCaseProcessingTimeProps) => {
    const macroData = config?.saksbehandlingstid?.caseTime?.data;

    const { language } = usePageConfig();

    if (!macroData) {
        return null;
    }

    const { unit, number } = macroData;

    const translatorKey = number === 1 ? 'single' : 'multi';

    const unitText = translator(
        'caseProcessingTimeUnit',
        language
    )(translatorKey)[unit._selected];

    return <span>{`${number} ${unitText}`}</span>;
};
