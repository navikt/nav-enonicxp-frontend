import { MacroPropsCommon, MacroType } from './_macros-common';

type Button = {
    url: string;
    text: string;
    content: {
        _path: string;
    };
};

export interface MacroButtonProps extends MacroPropsCommon {
    name: MacroType.Button;
    // Can only contain one of the two, but need to preserve button_blue for legacy reasons
    config: { button: Button; button_blue?: never } | { button?: never; button_blue: Button };
}
