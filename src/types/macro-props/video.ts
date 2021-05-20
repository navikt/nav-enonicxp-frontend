import { MacroPropsCommon, MacroType } from './_macros-common';

interface VideoMacroProps extends MacroPropsCommon {
    descriptor: MacroType.Video;
    config: {
        video: string;
        title: string;
    };
}
