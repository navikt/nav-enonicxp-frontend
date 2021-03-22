import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { HeadingTag } from '../../typo-style';
import { HeaderCommonConfig } from '../_mixins';

export interface HeaderProps extends PartComponentProps {
    descriptor: PartType.Header;
    config: {
        title: string;
        anchorId: string;
        titleTag: HeadingTag;
    } & HeaderCommonConfig;
}
