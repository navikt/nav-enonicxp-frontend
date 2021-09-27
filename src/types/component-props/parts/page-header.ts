import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';

export interface PageHeaderProps extends PartComponentProps {
    descriptor: PartType.PageHeader;
    config: {
        title: string;
    } & RenderOnAuthStateMixin;
}
