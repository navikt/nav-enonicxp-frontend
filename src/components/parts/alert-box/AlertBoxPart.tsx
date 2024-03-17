import React from 'react';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { AlertProps } from '@navikt/ds-react';
import { PartComponent, PartType } from '../../../types/component-props/parts';

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

export const AlertBoxPart: PartComponent<PartType.AlertBox> = ({ config }) => {
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
