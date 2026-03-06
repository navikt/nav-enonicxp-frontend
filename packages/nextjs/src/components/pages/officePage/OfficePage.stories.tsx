import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { htmlAreaPart, sectionWithHeader } from 'components/pages/_storyMocks';
import { MediaType } from 'types/media';
import { withStore } from 'components/pages/_storyDecorators';
import { mockOfficeData, mockReception1 } from './officeDetails/mockData';
import { OfficePage } from './OfficePage';

const withBackground: Decorator = (Story) => (
    <div style={{ backgroundColor: 'var(--a-bg-subtle)' }}>
        <Story />
    </div>
);

const officeNorgData = {
    _selected: 'data' as const,
    data: {
        ...mockOfficeData,
        type: 'LOKAL',
        brukerkontakt: {
            ...mockOfficeData.brukerkontakt,
            publikumsmottak: [mockReception1],
        },
    },
};

const editorialPage = {
    type: ComponentType.Page as const,
    path: '/',
    descriptor: LayoutType.SingleColPage as const,
    config: {},
    regions: {
        pageContent: {
            components: [
                sectionWithHeader(
                    {
                        title: 'Dette kan vi hjelpe deg med',
                        anchorId: 'dette-kan-vi-hjelpe-deg-med',
                        icon: {
                            icon: {
                                type: MediaType.Vector,
                                mediaUrl: '',
                            },
                        },
                    },
                    [
                        htmlAreaPart(
                            '<ul>\n<li>Hjelp til å komme i jobb</li>\n<li>Hjelp i nødssituasjoner</li>\n<li>Økonomi- og gjeldsrådgivning</li>\n<li>Tilgang til PC</li>\n</ul>\n'
                        ),
                    ]
                ),
            ],
            name: 'pageContent' as const,
        },
    },
};

const meta = {
    component: OfficePage,
    decorators: [withStore, withBackground],
    args: {
        _id: 'story-office-page-id',
        _path: '/www.nav.no/kontor/nav-st.hanshaugen',
        createdTime: '2026-01-05T07:43:04.732Z',
        modifiedTime: '2026-02-01T05:16:24.979Z',
        type: ContentType.OfficePage,
        displayName: 'Nav St. Hanshaugen',
        language: 'no',
        data: {
            title: 'Nav St. Hanshaugen',
            officeNorgData,
        },
        page: {} as any,
        editorial: {
            _id: 'editorial-office-page-id',
            _path: '/www.nav.no/kontor/nav-st.hanshaugen/editorial',
            createdTime: '2026-01-05T07:43:04.732Z',
            modifiedTime: '2026-02-01T05:16:24.979Z',
            type: ContentType.OfficeEditorialPage,
            displayName: 'Nav St. Hanshaugen',
            language: 'no',
            data: {
                title: 'Nav St. Hanshaugen',
                taxonomy: [],
                illustration: { type: ContentType.Pictograms, data: { icons: [] } },
                area: [],
            },
            page: editorialPage,
        },
        publish: {
            from: '2026-01-05T07:43:04.970Z',
            first: '2026-01-05T07:43:04.970Z',
        },
    },
} satisfies Meta<typeof OfficePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
