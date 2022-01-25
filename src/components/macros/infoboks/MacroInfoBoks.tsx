import React from 'react';
import { MacroInfoBoksProps } from '../../../types/macro-props/infoBoks';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';

export const MacroInfoBoks = ({ config }: MacroInfoBoksProps) => {
    if (!config?.infoBoks) {
        return null;
    }

    // TODO: this should only be plain text, but it seems to be used
    // with HTML by some editors
    const { infoBoks } = config.infoBoks;

    return (
        <AlertBox variant={'info'} className={'macro-infoboks'}>
            <ParsedHtml htmlProps={infoBoks} />
        </AlertBox>
    );
};
