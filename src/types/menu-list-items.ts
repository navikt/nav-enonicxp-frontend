export interface LinkItem {
    links?: {
        text: string;
        url: string;
    }[];
}

// TODO: fjern legacy når XP er oppdatert
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
    FormAndApplicationLegacy = 'formAndApplication',
    ProcessTimesLegacy = 'processTimes',
    RelatedInformationLegacy = 'relatedInformation',
    ReportChangesLegacy = 'reportChanges',
    AppealRightsLegacy = 'appealRights',
    RulesAndRegulationsLegacy = 'rulesAndRegulations',
}

export type MenuListItem = {
    [key in MenuListItemKey]: LinkItem;
} & { _selected: MenuListItemKey[] };
