import { MacroPropsCommon, MacroName } from './_macros-common';

export interface VideoMacroProps extends MacroPropsCommon {
    name: MacroName.Video;
    config: {
        video: {
            video: string;
            title: string;
        };
    };
}
