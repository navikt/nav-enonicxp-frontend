import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/content-types/menuListItems';

type BundleStructure = {
    relatedContent: { [key in MenuListItemKey]: string };
} & { [key: string]: { [key: string]: string } };

export const bundle: BundleStructure = {
    dates: {
        lastChanged: 'Sist endret',
        published: 'Publisert',
    },
    linkPanels: {
        label: 'Valgpaneler',
    },
    linkLists: {
        news: 'Nyheter',
        moreNews: 'Flere nyheter',
        niceToKnow: 'Nyttig å vite',
        shortcuts: 'Snarveier',
        label: 'Lenker',
    },
    mainArticle: {
        facts: 'Fakta',
        lastChanged: 'Sist endret',
        linkedListDescription: 'Kapitler',
        published: 'Publisert',
        tableOfContents: 'Innholdsfortegnelse',
    },
    mainPanels: {
        label: 'Hovedvalg',
    },
    relatedContent: {
        appealRights: 'Klagerettigheter',
        formAndApplication: 'Skjema og søknad',
        international: 'Internasjonalt',
        membership: 'Medlemsskap i folketrygden',
        processTimes: 'Saksbehandlingstider',
        rates: 'Satser',
        relatedInformation: 'Relatert innhold',
        reportChanges: 'Meld fra om endringer',
        rulesAndRegulations: 'Regelverk',
        saksbehandling: 'Saksbehandling',
        selfservice: 'Selvbetjening',
        shortcuts: 'Snarveier',
    },
    publishingCalendar: {
        event: 'Kalenderhendelse',
        publishdate: 'Publiseringsdato',
    },
};

export type Translations = DeepPartial<typeof bundle>;
