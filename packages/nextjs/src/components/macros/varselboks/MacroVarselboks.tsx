import React from 'react';
import { Infokort } from 'components/_common/infokort/Infokort';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { MacroPropsCommon, MacroType } from 'types/macro-props/_macros-common';

export interface MacroVarselboksProps extends MacroPropsCommon {
    name: MacroType.Varselboks;
    config: {
        alert_box: {
            body: string;
        };
    };
}

export const MacroVarselboks = ({ config }: MacroVarselboksProps) => {
    if (!config?.alert_box) {
        return null;
    }

    const { body } = config.alert_box;

    return (
        <Infokort>
            <ParsedHtml htmlProps={body} />
        </Infokort>
    );
};
