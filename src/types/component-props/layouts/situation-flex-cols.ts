import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin } from '../_mixins';
import { FlexColsLayoutProps } from './flex-cols';

export interface SituationPageFlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: Regions<'flexcols'>;
    config: Pick<
        FlexColsLayoutProps['config'],
        'justifyContent' | 'numCols' | 'bgColor'
    > &
        HeaderWithAnchorMixin;
}
