import type { Meta, StoryObj } from '@storybook/react';
import { PageUpdatedInfo } from './PageUpdatedInfo';

const meta = {
    component: PageUpdatedInfo,
    args: {
        datetime: '2024-01-01',
    },
} satisfies Meta<typeof PageUpdatedInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
    args: {
        language: 'en',
    },
};

export const Ukrainian: Story = {
    args: {
        language: 'uk',
    },
};
