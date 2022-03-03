import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';
import { PartsMapperProps } from 'types/parts-mapper';

/** Only one FilterMenu is allowed per page. Attempts of adding subsequent filters
 * should result in an error text rather dhan displaying the actual filter. However,
 * make sure to keep the first filter.
 */
export const checkForDuplicateFilterMenus = ({
    partProps,
    pageProps,
}: PartsMapperProps) => {
    if (partProps.descriptor === PartType.FiltersMenu) {
        const regions = pageProps?.page?.regions as {
            [key: string]: RegionProps;
        };
        const components = regions.pageContent
            ?.components as PartComponentProps[];

        const filterMenus = components.filter(
            (component) => component.descriptor === PartType.FiltersMenu
        );

        if (filterMenus.length === 0) {
            return;
        }

        const firstFilterMenu = filterMenus[0];

        return { isFilterDuplicate: partProps.path !== firstFilterMenu.path };
    }
};
