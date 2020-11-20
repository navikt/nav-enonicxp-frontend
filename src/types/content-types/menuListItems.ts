import { GlobalContentSchema } from './_schema';

export interface LinkItem {
    link: GlobalContentSchema[];
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
} & { _selected: MenuListItemKey[] };
