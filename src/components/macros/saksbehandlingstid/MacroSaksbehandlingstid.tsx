import React from 'react';
import { MacroSaksbehandlingstidProps } from 'types/macro-props/saksbehandlingstid';
import { usePageContentProps } from 'store/pageContext';
import { Language, translator } from 'translations';
import { GlobalCaseTimeUnit } from 'types/content-props/global-values-props';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const getCaseTimeString = (
    value: number | string,
    unit: GlobalCaseTimeUnit,
    language: Language
) => {
    const translatorKey = value === 1 ? 'single' : 'multi';

    const unitText = translator('caseTimeUnit', language)(translatorKey)[unit];

    return `${value} ${unitText}`;
};

export const MacroSaksbehandlingstid = ({ config }: MacroSaksbehandlingstidProps) => {
    const macroData = config?.saksbehandlingstid?.caseTime;

    const { language } = usePageContentProps();

    if (!macroData) {
        return <EditorHelp text={'Teknisk feil: macro-data er ikke gyldig'} type={'error'} />;
    }

    const { value, unit } = macroData;

    if (value === undefined || !unit) {
        return (
            <EditorHelp
                text={'Teknisk feil: verdien er ikke definert'}
                globalWarningText={'Macro for saksbehandlingstid mangler verdi'}
                type={'error'}
            />
        );
    }

    const caseTimeString = getCaseTimeString(value, unit, language);

    return <span>{caseTimeString}</span>;
};
