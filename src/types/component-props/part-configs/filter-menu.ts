import { ExpandableMixin } from '../_mixins';

export type Filter = {
    filterName: string;
    id: string;
};

export type Category = {
    categoryName: string;
    filters: Filter[];
};

export type PartConfigFilterMenu = {
    title?: string;
    description: string;
    categories: Category[];
} & ExpandableMixin;
