import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ExpandableMixin } from '../_mixins';

type Filter = {
    filterName: string;
    id: string;
};

type Category = {
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
