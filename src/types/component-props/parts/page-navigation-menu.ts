import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
};

export interface PageNavigationMenuProps extends PartComponentProps {
    descriptor: PartType.PageNavigationMenu;
    config: {
        anchorLinks: AnchorLink[];
    };
}
