export interface LinkItem {
    links?: {
        text: string;
        url: string;
    }[];
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
