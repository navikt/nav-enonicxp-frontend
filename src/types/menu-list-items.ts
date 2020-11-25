import { ContentProps } from './content-props/_content-common';

export interface LinkItem {
    link: ContentProps[];
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
