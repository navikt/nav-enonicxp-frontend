import { GlobalSchema } from './_schema';

interface LinkItem {
    link: GlobalSchema[];
}

export type MenuListItemKey =
    | 'selfservice'
    | 'formAndApplication'
    | 'processTimes'
    | 'relatedInformation'
    | 'international'
    | 'reportChanges'
    | 'rates'
    | 'appealRights'
    | 'membership'
    | 'rulesAndRegulations'
    | 'saksbehandling'
    | 'shortcuts';

export type MenuListItem = {
    [key in MenuListItemKey]: LinkItem;
} & { selected: MenuListItemKey[], _selected: MenuListItemKey[] };
