import React from 'react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { MacroPropsCommon, MacroType } from 'types/macro-props/_macros-common';
import { Varselboks } from 'components/_common/varselboks/Varselboks';

export interface MacroVarselboksProps extends MacroPropsCommon {
    name: MacroType.AlertBox;
    config: {
        alert_box: {
            body: string;
            type: 'error' | 'warning' | 'info' | 'success';
            size?: 'small' | 'medium';
            inline?: boolean;
        };
    };
}

export const MacroVarselboks = ({ config }: MacroVarselboksProps) => {
    if (!config?.alert_box) {
        return null;
    }

    const { body, size, type, inline } = config.alert_box;

    return (
        <Varselboks variant={type} size={size} inline={inline}>
            <ParsedHtml htmlProps={body} />
        </Varselboks>
    );
};
