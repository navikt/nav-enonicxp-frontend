import type { Meta, StoryObj } from '@storybook/react';

import { FeaturedHeader } from './FeaturedHeader';

const meta = {
    component: FeaturedHeader,
} satisfies Meta<typeof FeaturedHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        contentProps: {
            displayName: 'displayNameFallback',
            modifiedTime: '2023-07-03T07:02:26.724412Z',
            createdTime: '2023-07-03T07:02:26.724412Z',
            data: {
                title: 'Featured Header',
            },
        },
    },
};
