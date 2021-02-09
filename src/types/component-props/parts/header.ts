import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { HeadingTag, TypoStyle } from '../../typo-style';

export interface HeaderProps extends PartComponentProps {
    descriptor: PartType.Header;
    config: Partial<{
        title: string;
        titleTypo: TypoStyle;
        titleTag: HeadingTag;
        ingress: string;
        anchorId: string;
        justify: 'left' | 'center' | 'right';
    }>;
}
