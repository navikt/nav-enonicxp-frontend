import type { Meta, StoryObj } from '@storybook/react';
import { ChatbotLenkepanel } from './ChatbotLenkepanel';

const meta = {
    component: ChatbotLenkepanel,
    args: {
        analyticsGroup: '',
        linkText: 'Tittel',
        ingress: 'Lorem ipsum dolor',
    },
} satisfies Meta<typeof ChatbotLenkepanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlertText: Story = {
    args: {
        alertText: 'Alert text',
    },
};
