import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { XpImageProps } from 'types/media';

export interface FrontpageSurveyPanel extends PartComponentProps {
    descriptor: PartType.FrontpageSurveyPanel;
    config: {
        description: ProcessedHtmlProps;
        header: string;
        icon?: {
            icon: XpImageProps;
            size?: number;
        };
    } & RenderOnAuthStateMixin;
}
