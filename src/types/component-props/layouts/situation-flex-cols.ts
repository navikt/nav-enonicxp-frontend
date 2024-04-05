import { LayoutCommonProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin } from 'types/component-props/_mixins';
import { FlexColsLayoutProps } from './flex-cols';
import { OptionSetSingle } from 'types/util-types';

export interface SituationPageFlexColsLayoutProps extends LayoutCommonProps {
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
