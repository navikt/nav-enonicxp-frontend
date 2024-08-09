import type { Meta, StoryObj } from '@storybook/react';
import LenkepanelNavNo from './LenkepanelNavNo';

const meta = {
    component: LenkepanelNavNo,
    args: { href: '', tittel: 'Lenkepanel', children: 'Dette er et lenkepanel' },
} satisfies Meta<typeof LenkepanelNavNo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertikal: Story = { args: { vertikal: true } };

export const Separator: Story = { args: { separator: true } };

export const VertikalSeparator: Story = { args: { vertikal: true, separator: true } };
