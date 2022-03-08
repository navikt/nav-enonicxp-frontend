import { LayoutProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';

interface Props {
    path: string;
    page: LayoutProps;
}

export const isFirstFilterMenuInPage = ({ path, page }: Props) => {
    const regions = page?.regions;

    if (!regions) {
        return {};
    }

    const components: PartComponentProps[] =
        regions['pageContent']?.components || [];

    const allFilterMenus = components.filter(
        (component) => component.descriptor === PartType.FiltersMenu
    );

    if (allFilterMenus.length === 0) {
        return;
    }

    // We want to keep the very first FiltersMenu-part, so make a not of this
    // in order to reference the path next.
    const firstFilterMenu = allFilterMenus[0];

    return path === firstFilterMenu.path;
};
