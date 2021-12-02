import React from 'react';
import { AlertPartProps } from 'types/component-props/parts/alert';
import { ParsedHtml } from '../../ParsedHtml';
import { AlertStripe } from '../../_common/alert-stripe/AlertStripe';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const AlertPart = (props: AlertPartProps) => {
    const { config } = props;

    if (!config) {
        return <EditorHelp text={'Tomt varselpanel'} />;
    }

    const { content, type, margin } = config;

    return (
        <AlertStripe
            variant={type || 'info'}
            style={{
                ...(margin && { margin }),
            }}
        >
            <ParsedHtml htmlProps={content} />
        </AlertStripe>
    );
};
