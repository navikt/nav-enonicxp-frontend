import type { Meta, StoryObj } from '@storybook/react';
import { CopyLink } from './copyLink';

const meta = {
    component: CopyLink,
    args: {
        anchor: 'https://www.nav.no',
        heading: 'Heading',
    },
} satisfies Meta<typeof CopyLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HideLabel: Story = {
    args: {
        showLabel: false,
    },
};
