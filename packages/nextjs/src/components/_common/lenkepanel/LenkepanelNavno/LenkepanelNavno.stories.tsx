import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { LenkepanelNavno } from './LenkepanelNavno';

const meta = {
    component: LenkepanelNavno,
    args: { href: '/href', linkText: 'Tekst', children: 'Children' },
} satisfies Meta<typeof LenkepanelNavno>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Lenkefargen er default blå, kan overstyres til å bli sort.',
            },
        },
    },
};

export const LinkColorBlack: Story = {
    args: {
        linkColor: 'black',
    },
};

export const ButtonLink: Story = {
    args: {
        children: 'Hvis lenken skal ha et JS-event (f.eks ChatOptions), skal vi bruke knapp',
        onClickEvent: fn(),
    },
};
