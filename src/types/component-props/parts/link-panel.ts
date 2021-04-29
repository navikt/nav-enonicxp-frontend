import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkWithIngressMixin } from '../_mixins';
import { XpImageProps } from '../../media';

type Variant = 'vertical' | 'verticalWithBgColor';

type VariantConfigs = {
    verticalWithBgColor: {
        iconBgColor: string;
        iconJustify: 'flex-start' | 'center' | 'flex-end';
    };
};

interface LinkPanelConfig extends LinkWithIngressMixin {
    vertical: boolean; // TODO: fjern denne når alle paneler i prod er oppdatert til å bruke variants
    background: XpImageProps;
    icon: XpImageProps;
    variant: {
        _selected: Variant;
    } & VariantConfigs;
}

export interface LinkPanelPartProps extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}
