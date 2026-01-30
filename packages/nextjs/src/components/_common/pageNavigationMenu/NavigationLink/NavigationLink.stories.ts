import type { Meta, StoryObj } from '@storybook/react';
import { NavigationLink } from './NavigationLink';

const meta = {
    component: NavigationLink,
    args: {
        anchorId: 'hvem',
        linkText: 'Hvem kan få?',
        analyticsComponent: 'Storybook',
    },
} satisfies Meta<typeof NavigationLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
    args: {
        'aria-current': 'true',
    },
};
