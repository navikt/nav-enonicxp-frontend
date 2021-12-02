import React from 'react';
import { ParsedHtml } from '../../ParsedHtml';
import { MacroAlertBoxProps } from '../../../types/macro-props/alert-box';
import { AlertStripe } from '../../_common/alert-stripe/AlertStripe';

export const MacroAlertBox = ({ config }: MacroAlertBoxProps) => {
    if (!config?.alert_box) {
        return null;
    }

    const { body, size, type } = config.alert_box;

    return (
        <AlertStripe variant={type} size={size === 'small' ? 's' : 'm'}>
            <ParsedHtml htmlProps={body} />
        </AlertStripe>
    );
};
