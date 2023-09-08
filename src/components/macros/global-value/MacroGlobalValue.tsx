import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { MacroGlobalValueProps } from '../../../types/macro-props/global-value';
import { formatNumber, isStringOnlyNumber } from '../../../utils/math';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    const { language } = usePageConfig();
    if (!config?.global_value) {
        return (
            <EditorHelp
                text={'Teknisk feil: macro-data er ikke gyldig'}
                type={'error'}
            />
        );
    }

    const { value } = config.global_value;

    if (value === undefined) {
        return (
            <EditorHelp
                text={'Teknisk feil: verdien er ikke definert'}
                globalWarningText={'Macro for global verdi mangler verdi'}
                type={'error'}
            />
        );
    }

    // This is a failsafe. Value should normally be digits and decimal separator only.
    if (!isStringOnlyNumber(value)) {
        return <>{value}</>;
    }

    const number = parseFloat(value);
    return <>{formatNumber(number, 2, language)}</>;
};
