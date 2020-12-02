import { ContentProps } from './content-props/_content-common';

export interface LinkItem {
    link: ContentProps[];
}

export enum MenuListItemKey {
    Selfservice = 'selfservice',
    FormAndApplication = 'formAndApplication',
    ProcessTimes = 'processTimes',
    RelatedInformation = 'relatedInformation',
    International = 'international',
    ReportChanges = 'reportChanges',
    Rates = 'rates',
    AppealRights = 'appealRights',
    Membership = 'membership',
    RulesAndRegulations = 'rulesAndRegulations',
    Saksbehandling = 'saksbehandling',
    Shortcuts = 'shortcuts',
}

export type MenuListItem = {
    [key in MenuListItemKey]: LinkItem;
} & { _selected: MenuListItemKey[] };
