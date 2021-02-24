import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface SectionHeaderProps extends PartComponentProps {
    descriptor: PartType.SectionHeader;
    config: {
        title: string;
        anchorId: string;
    };
}
