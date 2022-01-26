import React from 'react';
import { AlertBoxPartProps } from 'types/component-props/parts/alert-box';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const AlertBoxPart = (props: AlertBoxPartProps) => {
    const { config } = props;

    if (!config) {
        return <EditorHelp text={'Varselboksen er ikke konfigurert'} />;
    }

    const { content, type, size, inline, margin } = config;

    return (
        <AlertBox
            variant={type || 'info'}
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
