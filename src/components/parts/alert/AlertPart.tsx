import React from 'react';
import { AlertProps } from '@navikt/ds-react';
import {
    AlertPartProps,
    PartAlertType,
} from 'types/component-props/parts/alert';
import { ParsedHtml } from '../../ParsedHtml';
import { AlertStripe } from '../../_common/alert-stripe/AlertStripe';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

const partTypeToDsVariant: { [type in PartAlertType]: AlertProps['variant'] } =
    {
        info: 'info',
        advarsel: 'warning',
        feil: 'error',
        suksess: 'success',
    };

export const AlertPart = (props: AlertPartProps) => {
    const { config } = props;

    if (!config) {
        return <EditorHelp text={'Tomt varselpanel'} />;
    }

    const { content, type, size, margin } = config;

    return (
        <AlertStripe
            variant={partTypeToDsVariant[type] || 'info'}
            size={size === 'small' ? 's' : 'm'}
            style={{
                ...(margin && { margin }),
            }}
        >
            <ParsedHtml htmlProps={content} />
        </AlertStripe>
    );
};
