import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { OptionSetSingle } from 'types/util-types';

export interface HtmlAreaProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        anchoring: OptionSetSingle<{
            headerAndAnchor: {
                header: string;
                anchorId: string;
            };
        }>;
        html: ProcessedHtmlProps;
    } & ExpandableMixin &
        FiltersMixin &
        RenderOnAuthStateMixin;
}
