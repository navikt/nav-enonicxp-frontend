import React from 'react';
import { Provider } from 'react-redux';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { mockStore } from 'store/store';
import { PageContextProvider } from 'store/pageContext';
import {
    htmlAreaPart,
    productContactModuleLayout,
    sectionWithHeader,
} from 'components/pages/_storyMocks';
import { ProductPage } from './ProductPage';

const withStore: Decorator = (Story, context) => (
    <Provider store={mockStore}>
        <PageContextProvider content={context.args}>
            <Story />
        </PageContextProvider>
    </Provider>
);

const meta = {
    component: ProductPage,
    decorators: [withStore],
    args: {
        _id: 'story-product-page-id',
        _path: '/www.nav.no/no/bedrift/svangerskapspenger-til-ansatt',
        createdTime: '2024-04-08T09:11:05.630Z',
        modifiedTime: '2026-03-03T07:16:06.147Z',
        type: ContentType.ProductPage,
        displayName: 'Svangerskapspenger',
        language: 'no',
        data: {
            taxonomy: [ProductTaxonomy.EMPLOYEE_BENEFITS],
            chatbotToggle: true,
            title: 'Svangerskapspenger',
            feedbackToggle: false,
            noindex: false,
            nosnippet: false,
            illustration: {
                type: ContentType.Pictograms,
                data: { icons: [] },
            },
            audience: {
                _selected: Audience.EMPLOYER,
                [Audience.PERSON]: {},
                [Audience.EMPLOYER]: {},
                [Audience.PROVIDER]: {},
            },
            ingress:
                'Sikrer inntekt til friske kvinner som ikke kan fortsette å jobbe under svangerskapet fordi det kan medføre risiko for barnet.',
            area: [Area.HEALTH],
        },
        page: {
            type: ComponentType.Page,
            path: '/',
            descriptor: LayoutType.InnholdssideMedMeny,
            config: {
                leftMenuHeader: 'Innhold',
                showInternalNav: true,
                anchorLinks: [{ anchorId: 'hvem', linkText: 'Hvem kan få?', isDupe: false }],
                showProductName: true,
            },
            regions: {
                topPageContent: {
                    components: [
                        sectionWithHeader('/topPageContent/0', { anchorId: 'kort-om' }, [
                            htmlAreaPart(
                                '/topPageContent/0/content/0',
                                '<p>Friske kvinner som ikke kan fortsette å jobbe under svangerskapet fordi det kan medføre risiko for barnet, kan få svangerskapspenger.</p>\n'
                            ),
                        ]),
                    ],
                    name: 'topPageContent',
                },
                pageContent: {
                    components: [
                        sectionWithHeader(
                            '/pageContent/0',
                            { title: 'Hvem kan få?', anchorId: 'hvem' },
                            [
                                htmlAreaPart(
                                    '/pageContent/0/content/0',
                                    '<p>For å få svangerskapspenger skal den ansatte ha en jobb der arbeidssituasjoner kan utgjøre en risiko for det ufødte barnet.</p>\n\n<ul>\n<li>arbeid med kjemiske stoffer</li>\n<li>fysisk tungt arbeid</li>\n<li>stressende arbeid</li>\n</ul>\n'
                                ),
                            ]
                        ),
                    ],
                    name: 'pageContent',
                },
                bottomRow: {
                    components: [productContactModuleLayout('/bottomRow/0')],
                    name: 'bottomRow',
                },
            },
        },
        publish: {
            from: '2024-05-06T08:44:29.999Z',
            first: '2024-05-06T08:44:29.999Z',
        },
    },
} satisfies Meta<typeof ProductPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
