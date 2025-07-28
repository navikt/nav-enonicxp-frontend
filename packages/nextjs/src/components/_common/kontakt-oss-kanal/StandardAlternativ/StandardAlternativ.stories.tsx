import type { Meta, StoryObj } from '@storybook/react';

import { StandardAlternativ } from './StandardAlternativ';

const meta = {
    component: StandardAlternativ,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof StandardAlternativ>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AidCentral: Story = { args: { channel: 'aidcentral' } };
export const NavOffice: Story = { args: { channel: 'navoffice' } };
export const Chat: Story = { args: { channel: 'chat' } };
