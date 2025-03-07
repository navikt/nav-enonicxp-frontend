import type { Meta, StoryObj } from '@storybook/react';

import { DateLine } from './DateLine';

const meta = {
    component: DateLine,
} satisfies Meta<typeof DateLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: {
            modifiedTime: '2023-07-03T07:02:26.724412Z',
            createdTime: '2023-07-03T07:02:26.724412Z',
            language: 'no',
        },
    },
};

export const English: Story = {
    args: {
        content: {
            ...Default.args.content,
            language: 'en',
        },
    },
};
