import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { LinkSelectable } from '../_mixins';

export interface FrontpageLoggedinSectionLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: Regions<'cards'>;
    config: {
        header: string;
        mypage: {
            link: LinkSelectable;
        };
    };
}
