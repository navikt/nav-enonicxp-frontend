import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { UxSignalsWidget } from 'components/_common/uxsignalsWidget/UxSignalsWidget';
import { MacroUxSignalsWidgetProps } from 'types/macro-props/uxSignalsWidget';

export const MacroUxSignalsWidget = ({ config }: MacroUxSignalsWidgetProps) => {
    if (!config?.uxsignals_widget?.embedCode) {
        return <EditorHelp text={'Tom UXSignals macro, sett inn en embed-kode'} type={'error'} />;
    }

    return <UxSignalsWidget embedCode={config.uxsignals_widget.embedCode} />;
};
