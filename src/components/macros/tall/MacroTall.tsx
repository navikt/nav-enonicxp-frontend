import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { formatNumber } from 'utils/math';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { MacroTallProps } from 'types/macro-props/tall';

export const MacroTall = ({ config }: MacroTallProps) => {
    const { language } = usePageConfig();
    if (!config?.tall) {
        return (
            <EditorHelp
                text={'Teknisk feil: macroen er ikke konfigurert'}
                type={'error'}
            />
        );
    }

    const { verdi } = config.tall;
    if (verdi === undefined) {
        return (
            <EditorHelp
                text={'Teknisk feil: verdien er ikke definert'}
                type={'error'}
            />
        );
    }

    const number = Number(verdi);
    if (isNaN(number)) {
        return (
            <EditorHelp
                text={'Teknisk feil: verdien er ikke et gyldig tall'}
                type={'error'}
            />
        );
    }

    return <>{formatNumber(number, 2, language)}</>;
};
