import type { Meta, StoryObj } from '@storybook/react';

import { LanguageDisclaimer } from './LanguageDisclaimer';

const meta = {
    component: LanguageDisclaimer,
} satisfies Meta<typeof LanguageDisclaimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Kun på bokmål',
    },
};
