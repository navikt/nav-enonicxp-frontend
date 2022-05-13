import React from 'react';
import { MacroCaseProcessingTimeProps } from '../../../types/macro-props/case-processing-time';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { translator } from '../../../translations';

export const MacroSaksbehandlingstid = ({
    config,
}: MacroCaseProcessingTimeProps) => {
    const macroData = config?.saksbehandlingstid?.caseTime;

    const { language } = usePageConfig();

    if (!macroData) {
        return null;
    }

    const { unit, value } = macroData;

    const translatorKey = value === 1 ? 'single' : 'multi';

    const unitText = translator(
        'caseProcessingTimeUnit',
        language
    )(translatorKey)[unit];

    return <span>{`${value} ${unitText}`}</span>;
};
