import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';

export const targetPageMock: ContentProps = {
    _id: 'id',
    _path: '/no/person/dagpenger',
    createdTime: '',
    displayName: 'Dagpenger for privatperson',
    language: 'no',
    modifiedTime: '',
    type: ContentType.TemplatePage,
    data: {},
} as ContentProps;

export const contentMockBase: ProductPageProps = {
    _id: '',
    _path: '/no/person/dagpenger',
    modifiedTime: '',
    createdTime: '',
    displayName: 'Dagpenger',
    language: 'no',
    type: ContentType.ProductPage,
    data: {
        area: [],
        taxonomy: [],
        title: 'Dagpenger',
        illustration: {
            type: ContentType.Pictograms,
            data: { icons: [] },
        },
        alternativeAudience: {
            _selected: ['person', 'employer'],
            person: { targetPage: targetPageMock },
            employer: {
                targetPage: {
                    ...targetPageMock,
                    displayName: 'Dagpenger for arbeidsgiver',
                },
            },
            provider: { providerList: [] },
        },
    },
    page: {
        type: ComponentType.Page,
        config: { anchorLinks: [], leftMenuHeader: '', showInternalNav: false },
        descriptor: LayoutType.InnholdssideMedMeny,
        path: '',
        regions: {
            bottomRow: { components: [], name: 'bottomRow' },
            topPageContent: { components: [], name: 'topPageContent' },
            pageContent: { name: 'pageContent', components: [] },
        },
    },
} as ProductPageProps;

export const anchorLinksMock = [
    { anchorId: 'hvem-kan-fa', linkText: 'Hvem kan få?', isDupe: false },
    { anchorId: 'hva-kan-du-fa', linkText: 'Hva kan du få?', isDupe: false },
    { anchorId: 'hvordan-soknad', linkText: 'Hvordan søke?', isDupe: false },
    { anchorId: 'utbetaling', linkText: 'Utbetaling', isDupe: false },
];
