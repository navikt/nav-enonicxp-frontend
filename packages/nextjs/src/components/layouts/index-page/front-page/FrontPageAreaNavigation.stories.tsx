import type { Meta, StoryObj } from '@storybook/react';
import { Audience } from 'types/component-props/_mixins';
import { ContentType } from 'types/content-props/_content-common';
import { Area } from 'types/areas';
import { FrontPageAreaNavigation } from './FrontPageAreaNavigation';

const meta = {
    component: FrontPageAreaNavigation,
} satisfies Meta<typeof FrontPageAreaNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Person: Story = {
    args: {
        content: {
            type: ContentType.FrontPage,
            data: {
                areasHeader: 'Velg område',
                audience: {
                    _selected: Audience.PERSON,
                    [Audience.PERSON]: {},
                    [Audience.EMPLOYER]: {},
                    [Audience.PROVIDER]: { provider_audience: [] },
                },
                navigationRefs: [
                    {
                        _id: '1',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Arbeid',
                            area: Area.WORK,
                        },
                    },
                    {
                        _id: '2',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Helse og sykdom',
                            area: Area.HEALTH,
                        },
                    },
                    {
                        _id: '3',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Familie og barn',
                            area: Area.FAMILY,
                        },
                    },
                    {
                        _id: '4',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Pensjon',
                            area: Area.PENSION,
                        },
                    },
                    {
                        _id: '5',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Sosiale tjenester og veiledning',
                            area: Area.SOCIAL_COUNSELLING,
                        },
                    },
                    {
                        _id: '6',
                        _path: '',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Hjelpemidler og tilrettelegging',
                            area: Area.ACCESSIBILITY,
                        },
                    },
                ],
            },
        },
    },
};
