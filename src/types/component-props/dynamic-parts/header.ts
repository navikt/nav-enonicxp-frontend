import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface HeaderProps extends PartComponentProps {
    descriptor: PartType.Header;
    config: Partial<{
        title: string;
        ingress: string;
    }>;
}
