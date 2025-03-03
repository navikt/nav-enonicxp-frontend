import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentType } from 'types/component-props/_component-common';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LayoutType } from 'types/component-props/layouts';
import { AlternativeAudience } from './AlternativeAudience';

const targetPageMock: ContentProps = {
    _id: 'id',
    _path: 'path',
    createdTime: '',
    displayName: 'displayname',
    language: 'no',
    modifiedTime: '',
    type: ContentType.TemplatePage,
    data: {},
};

const contentMock: ProductPageProps = {
    editorView: 'edit',
    data: {
        alternativeAudience: {
            _selected: ['person'],
            person: {
                targetPage: targetPageMock,
            },
            employer: { targetPage: targetPageMock },
            provider: { providerList: [] },
        },
        area: [],
        illustration: {
            data: { icons: [] },
            type: ContentType.Pictograms,
        },
        taxonomy: [],
        title: '',
    },
    type: ContentType.ProductPage,
    _id: '',
    _path: '',
    modifiedTime: '',
    createdTime: '',
    displayName: 'displayname',
    language: 'no',
    page: {
        type: ComponentType.Page,
        config: { anchorLinks: [], leftMenuHeader: '', showInternalNav: false },
        descriptor: LayoutType.PageWithSideMenus,
        path: '',
        regions: {
            bottomRow: { components: [], name: 'bottomRow' },
            pageContent: { components: [], name: 'pageContent' },
            topPageContent: { components: [], name: 'topPageContent' },
        },
    },
};

const withMockedPageContent: Decorator = (Story) => (
    <PageContextProvider content={contentMock}>
        <Story />
    </PageContextProvider>
);

const meta = {
    component: AlternativeAudience,
    decorators: [withMockedPageContent],
} satisfies Meta<typeof AlternativeAudience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
