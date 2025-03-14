import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { LinkSelectable } from 'types/component-props/_mixins';

export interface FrontpageLoggedinSectionLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SituationPageFlexCols;
    regions: Regions<'cards'>;
    config: {
        header: string;
        title: string;
        mypage: {
            link: LinkSelectable;
        };
    };
}
