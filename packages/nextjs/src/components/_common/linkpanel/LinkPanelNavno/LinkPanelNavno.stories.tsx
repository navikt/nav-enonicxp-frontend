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
