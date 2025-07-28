import React from 'react';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import { MacroVarselBoksProps } from 'types/macro-props/varselBoks';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import style from './Deprecated_MacroVarselBoks.module.scss';

// This macro is deprecated
export const Deprecated_MacroVarselBoks = ({ config }: MacroVarselBoksProps) => {
    if (!config?.varselBoks) {
        return null;
    }

    // This should only be plain text, but it seems to be used
    // with HTML by some editors
    const { varselBoks } = config.varselBoks;

    return (
        <Varselboks variant={'warning'} className={style.macroVarselboks}>
            <ParsedHtml htmlProps={varselBoks} />
        </Varselboks>
    );
};
