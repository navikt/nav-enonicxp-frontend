import type { Meta, StoryObj } from '@storybook/react';

import { ProductDetailType } from 'types/content-props/product-details';
import { Expandable } from './Expandable';

const meta = {
    component: Expandable,
    args: {
        title: 'Expandable',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
} satisfies Meta<typeof Expandable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        expandableType: ProductDetailType.PROCESSING_TIMES,
    },
};

export const IsOpen: Story = {
    args: {
        ...Default.args,
        isOpenDefault: true,
    },
};

export const LegacyUsage: Story = {};
