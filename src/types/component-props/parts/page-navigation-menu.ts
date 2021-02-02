import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

type AnchorLink = {
    anchor: string;
    linkText: string;
};

export interface PageNavigationMenuProps extends PartComponentProps {
    descriptor: PartType.PageNavigationMenu;
    config: {
        anchorLinks: AnchorLink[];
    };
}
