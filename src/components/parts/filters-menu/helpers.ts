import { LayoutProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';

interface Props {
    path: string;
    page: LayoutProps;
}

export const checkIfFilterFirstInPage = ({ path, page }: Props) => {
    const regions = page?.regions;

    if (!regions) {
        return false;
    }

    const components: PartComponentProps[] =
        regions['pageContent']?.components || [];

    const allFilterMenus = components.filter(
        (component) => component.descriptor === PartType.FiltersMenu
    );

    if (allFilterMenus.length === 0) {
        return false;
    }

    // Make a not of the very first FiltersMenu in order to
    // check for path later.
    const firstFilterMenu = allFilterMenus[0];

    return path === firstFilterMenu.path;
};
