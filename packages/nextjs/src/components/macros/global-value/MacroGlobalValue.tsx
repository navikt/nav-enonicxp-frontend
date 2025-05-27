import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { MacroGlobalValueProps } from 'types/macro-props/global-value';
import { formatNumber, isStringOnlyNumber } from 'utils/math';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    const { language } = usePageContentProps();
    if (!config?.global_value) {
        return <EditorHelp text={'Teknisk feil: macro-data er ikke gyldig'} type={'error'} />;
    }

    const { value, decimals } = config.global_value;

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

    return (
        <>
            {formatNumber({
                num: parseFloat(value),
                minDecimals: decimals,
                maxDecimals: decimals,
                language,
            })}
        </>
    );
};
