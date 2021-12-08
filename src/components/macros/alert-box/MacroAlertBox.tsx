import React from 'react';
import { ParsedHtml } from '../../ParsedHtml';
import { MacroAlertBoxProps } from '../../../types/macro-props/alert-box';
import { AlertBox } from '../../_common/alert-box/AlertBox';

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
