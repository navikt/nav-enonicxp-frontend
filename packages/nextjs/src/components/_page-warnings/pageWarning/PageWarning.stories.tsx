import type { Meta, StoryObj } from '@storybook/react';

import { PageWarning } from './PageWarning';

const meta = {
    component: PageWarning,
} satisfies Meta<typeof PageWarning>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        whiteBg: false,
        size: 'small',
        children: 'This is a warning',
    },
};

export const WithWhiteBackground: Story = {
    args: {
        whiteBg: true,
        size: 'small',
        children: 'This is a warning with white background',
    },
};

export const LargeSize: Story = {
    args: {
        whiteBg: false,
        size: 'medium',
        children: 'This is a large warning',
    },
};

export const LargeWithWhiteBackground: Story = {
    args: {
        whiteBg: true,
        size: 'medium',
        children: 'This is a large warning with white background',
    },
};
