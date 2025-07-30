import type { Meta, StoryObj } from '@storybook/react';
import { LenkepanelNavnoSimple } from './LenkepanelNavnoSimple';

const meta = {
    component: LenkepanelNavnoSimple,
    args: { href: '', children: 'Hei' },
} satisfies Meta<typeof LenkepanelNavnoSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Kan brukes uten ikon, men per 21.10.24 så brukes den kun med ikon',
            },
        },
    },
};

export const WithIcon: Story = {
    args: {
        icon: (
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
