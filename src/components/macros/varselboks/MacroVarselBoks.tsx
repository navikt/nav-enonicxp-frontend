import React from 'react';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { MacroVarselBoksProps } from 'types/macro-props/varselBoks';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import style from './MacroVarselBoks.module.scss';

// This macro is deprecated
export const MacroVarselBoks = ({ config }: MacroVarselBoksProps) => {
    if (!config?.varselBoks) {
        return null;
    }

    // This should only be plain text, but it seems to be used
    // with HTML by some editors
    const { varselBoks } = config.varselBoks;

    return (
        <AlertBox variant={'warning'} className={style.macroVarselboks}>
            <ParsedHtml htmlProps={varselBoks} />
        </AlertBox>
    );
};
