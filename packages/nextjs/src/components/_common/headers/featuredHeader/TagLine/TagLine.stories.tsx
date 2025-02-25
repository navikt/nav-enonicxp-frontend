import type { Meta, StoryObj } from '@storybook/react';

import { TagLine } from './TagLine';

const meta = {
    component: TagLine,
} satisfies Meta<typeof TagLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Tagline' } };
