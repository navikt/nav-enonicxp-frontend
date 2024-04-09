import { LayoutCommonProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { LinkSelectable } from 'types/component-props/_mixins';

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
