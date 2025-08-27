import React from 'react';
import { Provider } from 'react-redux';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { mockStore } from 'store/store';
import { PartType } from 'types/component-props/parts';
import * as MenyForInternnavigasjon from 'components/_common/menyForInternnavigasjon/MenyForInternnavigasjon.stories';
import { SituationPage } from './SituationPage';

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

const meta = {
    component: SituationPage,
    decorators: [withStore],
    //Ikke en komplett side. Ikke sikkert vi skal sette opp hele sider i storybook.
    //Bør kanskje finne en bedre måte å gjøre dette på om vi skal prøve å ha hele sider i storybook.
    //Sjekk ut: https://storybook.js.org/docs/writing-stories/build-pages-with-storybook
    args: {
        _id: '23a43b41-ac9f-4270-9397-30400aad1940',
        _path: '/www.nav.no/no/person/hjelpemidler/livssituasjoner/trenger-tilrettelegging-pa-jobb-eller-i-utdanning',
        createdTime: '2021-10-22T07:14:43.875405Z',
        modifiedTime: '2024-04-17T07:43:40.976132Z',
        type: ContentType.SituationPage,
        displayName: 'Trenger tilrettelegging på jobb eller i utdanning',
        language: 'no',
        data: {
            taxonomy: [] as Taxonomy[],
            chatbotToggle: true,
            title: 'Trenger tilrettelegging på jobb eller i utdanning',
            feedbackToggle: false,
            noindex: false,
            illustration: {
                type: ContentType.Pictograms,
                data: {
                    icons: [],
                },
            },
            audience: {
                _selected: Audience.PERSON,
                [Audience.PERSON]: {},
                [Audience.EMPLOYER]: {},
                [Audience.PROVIDER]: {},
            },
            ingress:
                'Hjelpemidler og tilrettelegging på arbeidsplassen eller skolen for å kunne jobbe eller gjennomføre utdanning.',
            area: [Area.ACCESSIBILITY, Area.WORK],
            nosnippet: false,
        },
        page: {
            type: ComponentType.Page,
            path: '/',
            descriptor: LayoutType.SingleColPage,
            config: {},
            regions: {
                pageContent: {
                    components: [
                        {
                            path: '/pageContent/0',
                            type: ComponentType.Layout,
                            descriptor: LayoutType.SectionWithHeader,
                            config: {
                                anchorId: 'kort-om',
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/0/content/0',
                                            type: ComponentType.Part,
                                            descriptor: PartType.HtmlArea,
                                            config: {
                                                html: {
                                                    processedHtml:
                                                        '<p>Hvis du har nedsatt funksjonsevne, kan det hende du trenger tilrettelegging på arbeidsplassen eller på utdanningsinstitusjonen.</p>\n',
                                                    macros: [],
                                                },
                                                expandableTitle: 'Les mer',
                                                expandable: false,
                                                renderOnAuthState: undefined,
                                                filters: [],
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/1',
                            type: ComponentType.Part,
                            descriptor: PartType.MenyForInternnavigasjon,
                            config: {
                                anchorLinks: MenyForInternnavigasjon.default.args.anchorLinks,
                            },
                        },
                    ],
                    name: 'pageContent',
                },
            },
        },
        publish: {
            from: '2021-10-22T07:21:39.794Z',
            first: '2021-10-22T07:21:39.794Z',
        },
    },
} satisfies Meta<typeof SituationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
    args: {
        language: 'en',
    },
};

export const EditorView: Story = {
    args: {
        editorView: 'edit',
    },
};
