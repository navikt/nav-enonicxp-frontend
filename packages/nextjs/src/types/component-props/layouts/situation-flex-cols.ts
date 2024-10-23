import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin } from 'types/component-props/_mixins';
import { FlexColsLayoutProps } from './flex-cols';

export interface SituationPageFlexColsLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: Regions<'flexcols'>;
    config: Pick<FlexColsLayoutProps['config'], 'justifyContent' | 'numCols' | 'bgColor'> &
        HeaderWithAnchorMixin;
}
