import { GlobalSchema } from './_schema';

interface LinkItem {
    link: GlobalSchema[];
}

export interface MenuListItem {
    selected: string[];
    _selected: string[];
    selfservice: LinkItem;
    formAndApplication: LinkItem;
    processTimes: LinkItem;
    relatedInformation: LinkItem;
    international: LinkItem;
    reportChanges: LinkItem;
    rates: LinkItem;
    appealRights: LinkItem;
    membership: LinkItem;
    rulesAndRegulations: LinkItem;
}
