import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { contactModuleLayout, htmlAreaPart, sectionWithHeader } from 'components/pages/_storyMocks';
import { withStore } from 'components/pages/_storyDecorators';
import { SituationPage } from './SituationPage';

const anchorLinks = [
    { anchorId: 'trygderegler', linkText: 'Trygderegler i andre land', isDupe: false },
    { anchorId: 'relaterte-situasjoner', linkText: 'I en annen situasjon?', isDupe: false },
];

const meta = {
    component: SituationPage,
    decorators: [withStore],
    args: {
        _id: 'story-situation-page-id',
        _path: '/www.nav.no/no/person/arbeid/livssituasjoner/eksempel-situasjonsside',
        createdTime: '2022-06-20T10:14:50.671Z',
        modifiedTime: '2026-02-06T08:16:19.467Z',
        type: ContentType.SituationPage,
        displayName: 'Eksempel situasjonsside',
        language: 'no',
        data: {
            taxonomy: [] as Taxonomy[],
            chatbotToggle: true,
            title: 'Eksempel situasjonsside',
            feedbackToggle: false,
            noindex: false,
            illustration: {
                type: ContentType.Pictograms,
                data: { icons: [] },
            },
            audience: {
                _selected: Audience.PERSON,
                [Audience.PERSON]: {},
                [Audience.EMPLOYER]: {},
                [Audience.PROVIDER]: {},
            },
            ingress:
                'Informasjon om hvilke regler som gjelder i din situasjon, og hva du kan ha rett til av ytelser og tjenester fra NAV.',
            area: [Area.WORK],
            nosnippet: false,
            relatedSituations: [
                {
                    _id: 'related-1',
                    _path: '/www.nav.no/opphold-i-utlandet',
                    createdTime: '2022-01-01T00:00:00Z',
                    modifiedTime: '2025-01-01T00:00:00Z',
                    type: ContentType.SituationPage,
                    displayName: 'Skal oppholde deg i utlandet uten å jobbe',
                    language: 'no',
                    data: {
                        taxonomy: [] as Taxonomy[],
                        title: 'Skal oppholde deg i utlandet uten å jobbe',
                        illustration: { type: ContentType.Pictograms, data: { icons: [] } },
                        audience: {
                            _selected: Audience.PERSON,
                            [Audience.PERSON]: {},
                            [Audience.EMPLOYER]: {},
                            [Audience.PROVIDER]: {},
                        },
                        area: [Area.WORK],
                        customPath: '/opphold-i-utlandet',
                    },
                    page: {} as any,
                },
            ],
        },
        page: {
            type: ComponentType.Page,
            path: '/',
            descriptor: LayoutType.SingleColPage,
            config: {},
            regions: {
                pageContent: {
                    components: [
                        sectionWithHeader('/pageContent/0', {}, [
                            htmlAreaPart(
                                '/pageContent/0/content/0',
                                '<p>Informasjon om hvilke regler som gjelder i din situasjon, og hva du kan ha rett til av ytelser og tjenester fra NAV.</p>\n'
                            ),
                        ]),
                        {
                            path: '/pageContent/1',
                            type: ComponentType.Part,
                            descriptor: PartType.PageNavigationMenu,
                            config: { anchorLinks },
                        },
                        sectionWithHeader(
                            '/pageContent/2',
                            {
                                title: 'Trygderegler i andre land',
                                anchorId: 'trygderegler',
                            },
                            [
                                htmlAreaPart(
                                    '/pageContent/2/content/0',
                                    '<p>Når du jobber i et annet land, er det viktig å kjenne til hvilke trygderegler som gjelder. Det kan ha betydning for om du er medlem i folketrygden eller ikke.</p>\n'
                                ),
                                htmlAreaPart(
                                    '/pageContent/2/content/1',
                                    '<ul><li>Reglene avhenger av hvilket land du skal til</li><li>Det har betydning om Norge har trygdeavtale med landet</li><li>EØS-avtalen har egne regler</li></ul>\n',
                                    { title: 'Les mer om trygderegler' }
                                ),
                                htmlAreaPart(
                                    '/pageContent/2/content/2',
                                    '<p>Det er ulike regler avhengig av om du skal jobbe i ett eller flere land, og hvem du skal jobbe for.</p>\n'
                                ),
                            ]
                        ),
                        sectionWithHeader(
                            '/pageContent/3',
                            {
                                title: 'I en annen situasjon?',
                                anchorId: 'relaterte-situasjoner',
                            },
                            [
                                {
                                    path: '/pageContent/3/content/0',
                                    type: ComponentType.Part as const,
                                    descriptor: PartType.RelatedSituations as const,
                                    config: {
                                        title: ' ',
                                        description:
                                            'Se hva som gjelder hvis du er i en annen situasjon:',
                                    },
                                } as any,
                            ]
                        ),
                        contactModuleLayout('/pageContent/4'),
                    ],
                    name: 'pageContent',
                },
            },
        },
        publish: {
            from: '2022-06-20T10:18:47.074Z',
            first: '2022-06-20T10:18:47.074Z',
        },
    },
} satisfies Meta<typeof SituationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
