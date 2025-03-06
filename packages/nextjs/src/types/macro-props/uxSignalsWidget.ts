import { MacroPropsCommon, MacroType } from 'types/macro-props/_macros-common';

export interface MacroUxSignalsWidgetProps extends MacroPropsCommon {
    name: MacroType.UxSignalsWidget;
    config: {
        uxsignals_widget: {
            embedCode: string;
        };
    };
}
