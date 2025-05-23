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
                        _path: '/arbeid',
                        type: ContentType.AreaPage,
                        data: {
                            header: 'Arbeid',
                            area: Area.WORK,
                        },
                    },
                ],
            },
        },
    },
};
