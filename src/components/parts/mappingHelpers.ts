import { RegionProps } from 'types/component-props/layouts';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';
import { PartsMapperProps } from 'types/component-props/_component-common';

/** Only one FilterMenu is allowed per page. Attempts of adding subsequent filters
 * should result in an error text rather dhan displaying the actual filter. However,
 * make sure to keep the first filter.
 */
export const checkForDuplicateFilterMenus = ({
    partProps,
    pageProps,
}: PartsMapperProps) => {
    if (partProps.descriptor === PartType.FiltersMenu) {
        const regions = pageProps?.page?.regions;

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

        return { isFilterDuplicate: partProps.path !== firstFilterMenu.path };
    }

    return {};
};
