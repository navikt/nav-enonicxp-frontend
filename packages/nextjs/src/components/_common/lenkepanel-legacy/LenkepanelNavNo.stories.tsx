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

export const Ikon: Story = {
    args: {
        ikon: (
            <svg viewBox="0 0 100 100">
                <path
                    d="M 10,30
            A 20,20 0,0,1 50,30
            A 20,20 0,0,1 90,30
            Q 90,60 50,90
            Q 10,60 10,30 z"
                />
            </svg>
        ),
    },
};
