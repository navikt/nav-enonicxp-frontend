import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroVideoProps extends MacroPropsCommon {
    name: MacroType.Video;
    config: {
        video: {
            video: string;
            title: string;
        };
    };
}
