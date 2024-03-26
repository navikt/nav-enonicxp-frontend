import { ExpandableMixin } from 'types/component-props/_mixins';

export type FilterMenuFilter = {
    filterName: string;
    id: string;
};

export type FilterMenuCategory = {
    categoryName: string;
    filters: FilterMenuFilter[];
};

export type PartConfigFilterMenu = {
    title?: string;
    description: string;
    categories: FilterMenuCategory[];
} & ExpandableMixin;
