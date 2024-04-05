import React from 'react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AlertProps } from '@navikt/ds-react';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

// These types were used by a previous version of the design system component
// and are still used for the type property on the backend
type AlertTypeLegacy = 'info' | 'advarsel' | 'feil' | 'suksess';

const legacyTypeToVariant: {
    [type in AlertTypeLegacy]: AlertProps['variant'];
} = {
    info: 'info',
    advarsel: 'warning',
    feil: 'error',
    suksess: 'success',
};

export type PartConfigAlertBox = {
    content: ProcessedHtmlProps;
    type: 'info' | 'advarsel' | 'feil' | 'suksess';
    size?: 'small' | 'medium';
    inline?: boolean;
    margin: string;
};

export const AlertBoxPart = ({ config }: PartComponentProps<PartType.AlertBox>) => {
    if (!config) {
        return <EditorHelp text={'Varselboksen er ikke konfigurert'} />;
    }

    const { content, type, size, inline, margin } = config;

    return (
        <AlertBox
            variant={legacyTypeToVariant[type] || 'info'}
            size={size}
            inline={inline}
            style={{
                ...(margin && { margin }),
            }}
        >
            <ParsedHtml htmlProps={content} />
        </AlertBox>
    );
};
