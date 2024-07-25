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
import { SituationPage } from './SituationPage';

const meta = {
    title: 'Components/Pages/SituationPage',
    component: SituationPage,
} satisfies Meta<typeof SituationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

export const Default: Story = {
    decorators: [withStore],
    args: {
        _id: '23a43b41-ac9f-4270-9397-30400aad1940',
        // _name: 'trenger-tilrettelegging-pa-jobb-eller-i-utdanning',
        _path: '/www.nav.no/no/person/hjelpemidler/livssituasjoner/trenger-tilrettelegging-pa-jobb-eller-i-utdanning',
        // creator: 'user:adfs:1a41c681-a7e4-44a2-b711-b1137e86b760',
        // modifier: 'user:adfs:97a7782e-8b02-4336-ba06-7f4d3809d8eb',
        createdTime: '2021-10-22T07:14:43.875405Z',
        modifiedTime: '2024-04-17T07:43:40.976132Z',
        // owner: 'user:adfs:1a41c681-a7e4-44a2-b711-b1137e86b760',
        type: ContentType.SituationPage,
        displayName: 'Trenger tilrettelegging på jobb eller i utdanning',
        // hasChildren: false,
        language: 'no',
        // valid: true,
        // childOrder: 'modifiedtime DESC',
        data: {
            taxonomy: [] as Taxonomy[], //?
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
            // customPath: '/tilrettelegging-jobb',
            // owner: 'hjelpemidler_og_tilrettelegging',
            nosnippet: false,
        },
        // x: {
        //     'no-nav-navno': {
        //         redirectToLayer: {},
        //         previewOnly: {
        //             previewOnly: false,
        //         },
        //         virtualParent: {},
        //         searchOrder: {},
        //     },
        // },
        page: {
            type: ComponentType.Page,
            path: '/',
            descriptor: LayoutType.SingleColPage,
            config: {},
            regions: {
                pageContent: {
                    components: [],
                    name: 'pageContent',
                },
            },
        },
        // attachments: {},
        publish: {
            from: '2021-10-22T07:21:39.794Z',
            first: '2021-10-22T07:21:39.794Z',
        },
    },
};
