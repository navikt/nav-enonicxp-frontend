import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { ProductPanelExpandable } from './ProductPanelExpandable';

const meta = {
    component: ProductPanelExpandable,
    args: {
        header: 'Overskrift',
        illustration: {
            type: ContentType.Pictograms,
            data: {
                icons: [],
            },
        },
        anchorId: 'anchorid',
        children: 'Innhold',
    },
} satisfies Meta<typeof ProductPanelExpandable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIngress: Story = {
    args: {
        ingress: 'Dette er en kjempefin ingress',
        illustration: {
            type: ContentType.Pictograms,
            data: {
                icons: [],
            },
        },
    },
};
