import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { formatNumber } from 'utils/math';
import { EditorHelp } from '@/editor-tools/src/components/editor-help/EditorHelp';
import { MacroTallProps } from 'types/macro-props/tall';

export const MacroTall = ({ config }: MacroTallProps) => {
    const { language } = usePageContentProps();
    if (!config?.tall) {
        return <EditorHelp text={'Teknisk feil: macroen er ikke konfigurert'} type={'error'} />;
    }

    const { verdi, decimals } = config.tall;

    if (verdi === undefined) {
        return (
            <EditorHelp
                text={'Verdien er ikke definert'}
                globalWarningText={'Macro for tall mangler gyldig verdi'}
                type={'error'}
            />
        );
    }

    const number = Number(verdi);
    if (isNaN(number)) {
        return (
            <EditorHelp
                text={'Teknisk feil: verdien er ikke et gyldig tall'}
                globalWarningText={'Macro for tall mangler gyldig verdi'}
                type={'error'}
            />
        );
    }

    return (
        <>
            {formatNumber({
                num: number,
                minDecimals: decimals,
                maxDecimals: decimals,
                language,
            })}
        </>
    );
};
