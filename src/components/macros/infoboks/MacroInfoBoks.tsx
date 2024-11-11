import React from 'react';
import { MacroInfoBoksProps } from 'types/macro-props/infoBoks';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';

import style from './MacroInfoBoks.module.scss';

// This macro is deprecated
export const MacroInfoBoks = ({ config }: MacroInfoBoksProps) => {
    if (!config?.infoBoks) {
        return null;
    }

    // This should only be plain text, but it seems to be used
    // with HTML by some editors
    const { infoBoks } = config.infoBoks;

    return (
        <AlertBox variant={'info'} className={style.macroInfoboks}>
            <ParsedHtml htmlProps={infoBoks} />
        </AlertBox>
    );
};
