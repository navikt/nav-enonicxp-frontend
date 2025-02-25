import type { Meta, StoryObj } from '@storybook/react';

import { LenkepanelListe } from './LenkepanelListe';

const meta = {
    component: LenkepanelListe,
} satisfies Meta<typeof LenkepanelListe>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'LenkepanelListe',
        ingress: 'En liten ingresstekst',
        items: [
            { title: 'Lenkepanel 1', url: { text: 'test' } },
            { title: 'Lenkepanel 2', url: { text: 'test' } },
            { title: 'Lenkepanel 3', ingress: 'Ingress', url: { text: 'test' } },
        ],
    },
};
