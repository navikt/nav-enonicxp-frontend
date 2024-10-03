import type { Meta, StoryObj } from '@storybook/react';

import { ChatOption } from './ChatOption';

const meta = {
    component: ChatOption,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof ChatOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const WithAlert: Story = { args: { alertText: 'Alert!' } };
