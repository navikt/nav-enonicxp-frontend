import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { HeadingTag } from 'types/typo-style';
import { HeaderCommonConfig, RenderOnAuthStateMixin } from 'types/component-props/_mixins';

export interface HeaderProps extends PartComponentProps {
    descriptor: PartType.Header;
    config: {
        title: string;
        anchorId: string;
        titleTag: HeadingTag;
    } & HeaderCommonConfig &
        RenderOnAuthStateMixin;
}
