import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkPanelNavno } from './LinkPanelNavno';

const meta = {
    component: LinkPanelNavno,
    args: { href: '/href', linkText: 'Tekst', children: 'Children' },
} satisfies Meta<typeof LinkPanelNavno>;

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
        children: 'Hvis lenken skal ha et JS-event (ChatOptions), skal vi bruke knapp',
        onClickEvent: fn(),
    },
};
