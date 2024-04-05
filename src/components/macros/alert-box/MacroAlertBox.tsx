import React from 'react';

import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { MacroAlertBoxProps } from 'types/macro-props/alert-box';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

export const MacroAlertBox = ({ config }: MacroAlertBoxProps) => {
    if (!config?.alert_box) {
        return null;
    }

    const { body, size, type, inline } = config.alert_box;

    return (
        <AlertBox variant={type} size={size} inline={inline}>
            <ParsedHtml htmlProps={body} />
        </AlertBox>
    );
};
