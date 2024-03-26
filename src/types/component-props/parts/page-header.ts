import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { RenderOnAuthStateMixin } from 'types/component-props/_mixins';

export interface PageHeaderProps extends PartComponentProps {
    descriptor: PartType.PageHeader;
    config: {
        title: string;
    } & RenderOnAuthStateMixin;
}
