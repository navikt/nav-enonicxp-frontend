import { LayoutProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';

interface Props {
    path: string;
    page?: LayoutProps;
}

export const checkIfFilterFirstInPage = ({ path, page }: Props) => {
    const regions = page?.regions;

    // If no regions, the part is used inside the ComponentPreview.
    // Assume that the filter is first for now and any duplicate
    // filters will end up giving a warning when editor pressed "Mark as ready"
    if (!regions) {
        return true;
    }

    const allComponents = Object.values(regions).reduce(
        (collection, regionObject) => {
            const { components } = regionObject;
            return [...collection, ...components];
        },
        []
    );

    const allFilterMenus = allComponents.filter(
        (component: PartComponentProps) =>
            component.descriptor === PartType.FiltersMenu
    );

    if (allFilterMenus.length === 0) {
        return false;
    }

    // Make a not of the very first FiltersMenu in order to
    // check for path later.
    const firstFilterMenu = allFilterMenus[0];

    return path === firstFilterMenu.path;
};
