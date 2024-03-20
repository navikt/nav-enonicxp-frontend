import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ExpandableMixin } from 'types/component-props/_mixins';

export type Filter = {
    filterName: string;
    id: string;
};

export type Category = {
    categoryName: string;
    filters: Filter[];
};

export interface FilterMenuProps extends PartComponentProps {
    descriptor: PartType.FiltersMenu;
    config: {
        title?: string;
        description: string;
        categories: Category[];
    } & ExpandableMixin;
}
