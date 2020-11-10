import { GlobalSchema } from './_schema';

export interface MenuListItem {
    [key: string]: {
        link: GlobalSchema[];
    };
}
