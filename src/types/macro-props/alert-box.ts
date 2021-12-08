import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroAlertBoxProps extends MacroPropsCommon {
    name: MacroType.AlertBox;
    config: {
        alert_box: {
            body: string;
            type: 'error' | 'warning' | 'info' | 'success';
            size?: 'small' | 'medium';
            inline?: boolean;
        };
    };
}
