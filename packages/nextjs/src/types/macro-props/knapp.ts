import { MacroPropsCommon, MacroType } from './_macros-common';

type Knapp = {
    url: string;
    text: string;
    content: {
        _path: string;
    };
};

export interface MacroKnappProps extends MacroPropsCommon {
    name: MacroType.Knapp;
    // Can only contain one of the two, but need to preserve button_blue for legacy reasons
    config: { button: Knapp; button_blue?: never } | { button?: never; button_blue: Knapp };
}
