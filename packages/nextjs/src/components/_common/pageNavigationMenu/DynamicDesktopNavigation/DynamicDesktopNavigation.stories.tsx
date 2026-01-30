import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentType } from 'types/component-props/_component-common';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LayoutType } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { DynamicDesktopNavigation } from './DynamicDesktopNavigation';

const targetPageMock: ContentProps = {
    _id: 'id',
    _path: '/no/person/dagpenger',
    createdTime: '',
    displayName: 'Dagpenger for privatperson',
    language: 'no',
    modifiedTime: '',
    type: ContentType.TemplatePage,
    data: {},
} as ContentProps;

const contentMock: ProductPageProps = {
    _id: '',
    _path: '',
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
                targetPage: { ...targetPageMock, displayName: 'Dagpenger for arbeidsgiver' },
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
            pageContent: {
                name: 'pageContent',
                components: [
                    {
                        type: ComponentType.Layout,
                        path: '',
                        descriptor: LayoutType.SectionWithHeader,
                        config: { anchorId: 'hvem-kan-fa' },
                        regions: {
                            intro: { name: 'intro', components: [] },
                            content: {
                                name: 'content',
                                components: [
                                    {
                                        descriptor: PartType.Header,
                                        path: '',
                                        type: ComponentType.Part,
                                        config: {
                                            title: 'Krav til alder',
                                            anchorId: 'krav-til-alder',
                                            titleTag: 'h3',
                                        },
                                    },
                                    {
                                        descriptor: PartType.Header,
                                        path: '',
                                        type: ComponentType.Part,
                                        config: {
                                            title: 'Krav til arbeidstid',
                                            anchorId: 'krav-til-arbeidstid',
                                            titleTag: 'h3',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        type: ComponentType.Layout,
                        path: '',
                        descriptor: LayoutType.SectionWithHeader,
                        config: { anchorId: 'hva-kan-du-fa' },
                        regions: {
                            intro: { name: 'intro', components: [] },
                            content: {
                                name: 'content',
                                components: [
                                    {
                                        descriptor: PartType.Header,
                                        path: '',
                                        type: ComponentType.Part,
                                        config: {
                                            title: 'Beløp',
                                            anchorId: 'belop',
                                            titleTag: 'h3',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        type: ComponentType.Layout,
                        path: '',
                        descriptor: LayoutType.SectionWithHeader,
                        config: { anchorId: 'hvordan-soknad' },
                        regions: {
                            intro: { name: 'intro', components: [] },
                            content: { name: 'content', components: [] },
                        },
                    },
                    {
                        type: ComponentType.Layout,
                        path: '',
                        descriptor: LayoutType.SectionWithHeader,
                        config: { anchorId: 'utbetaling' },
                        regions: {
                            intro: { name: 'intro', components: [] },
                            content: { name: 'content', components: [] },
                        },
                    },
                ],
            },
        },
    },
};

const withPageContext: Decorator = (Story, context) => (
    <PageContextProvider content={context.args.pageProps ?? contentMock}>
        <Story />
    </PageContextProvider>
);

const meta = {
    component: DynamicDesktopNavigation,
    decorators: [withPageContext],
    args: {
        title: 'Innhold på siden',
        pageProps: contentMock,
        anchorLinks: [
            { anchorId: 'hvem-kan-fa', linkText: 'Hvem kan få?' },
            { anchorId: 'hva-kan-du-fa', linkText: 'Hva kan du få?' },
            { anchorId: 'hvordan-soknad', linkText: 'Hvordan søke?' },
            { anchorId: 'utbetaling', linkText: 'Utbetaling' },
        ],
        initialActiveAnchor: 'krav-til-arbeidstid',
    },
} satisfies Meta<typeof DynamicDesktopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
