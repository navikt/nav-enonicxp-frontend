import React from 'react';

import { UxSignalsWidgetPartProps } from 'types/component-props/parts/uxsignals-widget';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UxSignalsWidget } from 'components/_common/uxsignals-widget/UxSignalsWidget';

export const UxSignalsWidgetPart = ({ config }: UxSignalsWidgetPartProps) => {
    if (!config?.embedCode) {
        return (
            <EditorHelp text={'Tom UXSignals komponent, sett inn en embed-kode'} type={'error'} />
        );
    }

    return <UxSignalsWidget embedCode={config.embedCode} />;
};
