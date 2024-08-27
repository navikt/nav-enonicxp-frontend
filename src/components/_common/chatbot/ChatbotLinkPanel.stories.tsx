import type { Meta, StoryObj } from '@storybook/react';
import { ChatbotLinkPanel } from './ChatbotLinkPanel';

const meta = {
    component: ChatbotLinkPanel,
    args: {
        analyticsGroup: '',
        linkText: 'Tittel',
        ingress: 'Lorem ipsum dolor',
    },
} satisfies Meta<typeof ChatbotLinkPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlertText: Story = {
    args: {
        alertText: 'Alert text',
    },
};
