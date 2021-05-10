import { GlobalValueItem } from '../../../types/content-props/global-values-props';

export const nameExists = (
    itemName: string,
    items: GlobalValueItem[],
    key?: string
) =>
    items.find(
        (item) => item.itemName === itemName && (!key || item.key !== key)
    );
