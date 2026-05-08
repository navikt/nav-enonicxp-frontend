import React from 'react';
import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
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
        <InfoCard>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <ParsedHtml htmlProps={body} />
            </InfoCard.Message>
        </InfoCard>
    );
};
