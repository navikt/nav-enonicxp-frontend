import React from 'react';
import { MacroInfoBoksProps } from '../../../types/macro-props/infoBoks';
import { AlertStripe } from '../../_common/alert-stripe/AlertStripe';
import { ParsedHtml } from '../../ParsedHtml';
import './MacroInfoBoks.less';

export const MacroInfoBoks = ({ config }: MacroInfoBoksProps) => {
    if (!config?.infoBoks) {
        return null;
    }

    // TODO: this should only be plain text, but it seems to be used
    // with HTML by some editors
    const { infoBoks } = config.infoBoks;

    return (
        <AlertStripe variant={'info'} className={'macro-infoboks'}>
            <ParsedHtml htmlProps={infoBoks} />
        </AlertStripe>
    );
};
