import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin } from 'types/component-props/_mixins';
import { OptionSetSingle } from 'types/util-types';
import { FlexColsLayoutProps } from './flex-cols';

export interface SituationPageFlexColsLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: Regions<'flexcols'>;
    config: {
        shelf: OptionSetSingle<{
            products: { priority: 'primary' | 'secondary' | 'tertiary' };
            provider: {};
        }>;
    } & Pick<FlexColsLayoutProps['config'], 'justifyContent' | 'numCols' | 'bgColor'> &
        HeaderWithAnchorMixin;
}
