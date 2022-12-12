import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { XpImageProps } from 'types/media';

export interface FrontpageInfoPanel extends PartComponentProps {
    descriptor: PartType.FrontpageInfoPanel;
    config: {
        description: ProcessedHtmlProps;
        header: string;
        icon?: {
            icon: XpImageProps;
            color?: string;
            size?: number;
        };
    } & RenderOnAuthStateMixin;
}
