import type { Meta, StoryObj } from '@storybook/react';

import { ChatOption } from './ChatOption';

const meta = {
    component: ChatOption,
} satisfies Meta<typeof ChatOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
