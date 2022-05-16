import React from 'react';
import { MacroCaseProcessingTimeProps } from '../../../types/macro-props/case-processing-time';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { Language, translator } from '../../../translations';
import { CaseProcessingTimeUnit } from '../../../types/content-props/global-values-props';

export const getCaseTimeString = (
    value: number | string,
    unit: CaseProcessingTimeUnit,
    language: Language
) => {
    const translatorKey = value === 1 ? 'single' : 'multi';

    const unitText = translator(
        'caseProcessingTimeUnit',
        language
    )(translatorKey)[unit];

    return `${value} ${unitText}`;
};

export const MacroSaksbehandlingstid = ({
    config,
}: MacroCaseProcessingTimeProps) => {
    const macroData = config?.saksbehandlingstid?.caseTime;

    const { language } = usePageConfig();

    if (!macroData) {
        return null;
    }

    const { value, unit } = macroData;

    const caseTimeString = getCaseTimeString(value, unit, language);

    return <span>{caseTimeString}</span>;
};
