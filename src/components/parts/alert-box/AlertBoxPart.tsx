import React from 'react';
import { AlertBoxPartProps } from 'types/component-props/parts/alert-box';
import { ParsedHtml } from '../../ParsedHtml';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const AlertBoxPart = (props: AlertBoxPartProps) => {
    const { config } = props;

    if (!config) {
        return <EditorHelp text={'Tomt varselpanel'} />;
    }

    const { content, type, size, margin } = config;

    return (
        <AlertBox
            variant={type || 'info'}
            size={size}
            style={{
                ...(margin && { margin }),
            }}
        >
            <ParsedHtml htmlProps={content} />
        </AlertBox>
    );
};
