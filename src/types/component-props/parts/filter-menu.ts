import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ExpandableMixin } from '../_mixins';
import { ContentProps } from 'types/content-props/_content-common';

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
