import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface PageHeaderProps extends PartComponentProps {
    descriptor: PartType.PageHeader;
    config: {
        title: string;
    };
}
