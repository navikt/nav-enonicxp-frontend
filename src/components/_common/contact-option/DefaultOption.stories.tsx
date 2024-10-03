import type { Meta, StoryObj } from '@storybook/react';

import { DefaultOption } from './DefaultOption';

const meta = {
    component: DefaultOption,
} satisfies Meta<typeof DefaultOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AidCentral: Story = { args: { channel: 'aidcentral' } };

export const NavOffice: Story = { args: { channel: 'navoffice' } };
