import React from 'react';
import { MacroCaseProcessingTimeProps } from '../../../types/macro-props/case-processing-time';

export const MacroSaksbehandlingstid = ({
    config,
}: MacroCaseProcessingTimeProps) => {
    const macroData = config?.saksbehandlingstid?.caseTime?.data;

    if (!macroData) {
        return null;
    }

    const { unit, number } = macroData;

    return <span>{`${number} ${unit._selected}`}</span>;
};
