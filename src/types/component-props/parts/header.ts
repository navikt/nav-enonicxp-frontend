import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { TypoStyle } from '../../typo-style';

export interface HeaderProps extends PartComponentProps {
    descriptor: PartType.Header;
    config: Partial<{
        title: string;
        titleTypo: TypoStyle;
        ingress: string;
    }>;
}
