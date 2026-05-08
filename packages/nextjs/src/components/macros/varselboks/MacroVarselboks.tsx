import React from 'react';
import { Infokort } from 'components/_common/infokort/Infokort';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { MacroPropsCommon, MacroType } from 'types/macro-props/_macros-common';

export interface MacroInfokortProps extends MacroPropsCommon {
    name: MacroType.Infokort;
    config: {
        alert_box: {
            body: string;
        };
    };
}

export const MacroInfokort = ({ config }: MacroInfokortProps) => {
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
