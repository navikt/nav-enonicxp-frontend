import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UxSignalsWidget } from 'components/_common/uxsignals-widget/UxSignalsWidget';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const UxSignalsWidgetPart = ({
    config,
}: PartComponentProps<PartType.UxSignalsWidget>) => {
    if (!config?.embedCode) {
        return (
            <EditorHelp
                text={'Tom UXSignals komponent, sett inn en embed-kode'}
                type={'error'}
            />
        );
    }

    return <UxSignalsWidget embedCode={config.embedCode} />;
};
