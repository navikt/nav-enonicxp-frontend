import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

export interface SituationPageFlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: {
        flexcols: {
            components: ComponentProps[];
            name: 'flexcols';
        };
    };
    config: {
        title: string;
        numCols: number;
        justifyContent: 'flex-start' | 'center' | 'flex-end';
    };
}
