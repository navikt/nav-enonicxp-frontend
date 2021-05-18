export interface LinkItem {
    links?: {
        text: string;
        url: string;
    }[];
}

export enum MenuListItemKey {
    Selfservice = 'selfservice',
    FormAndApplication = 'form_and_application',
    ProcessTimes = 'process_times',
    RelatedInformation = 'related_information',
    International = 'international',
    ReportChanges = 'report_changes',
    Rates = 'rates',
    AppealRights = 'appeal_rights',
    Membership = 'membership',
    RulesAndRegulations = 'rules_and_regulations',
    Saksbehandling = 'saksbehandling',
    Shortcuts = 'shortcuts',
}

export type MenuListItem = {
    [key in MenuListItemKey]: LinkItem;
} & { _selected: MenuListItemKey[] };
