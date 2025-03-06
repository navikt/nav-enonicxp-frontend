import type { Meta, StoryObj } from '@storybook/react';

import { InfoBox } from './InfoBox';

const meta = {
    component: InfoBox,
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Dette er en infoboks' } };
