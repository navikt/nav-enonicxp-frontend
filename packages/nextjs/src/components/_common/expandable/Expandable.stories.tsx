import type { Meta, StoryObj } from '@storybook/react';

import { ProductDetailType } from 'types/content-props/product-details';
import { Expandable } from './Expandable';

const meta = {
    component: Expandable,
    args: {
        title: 'Expandable',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
} satisfies Meta<typeof Expandable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ProcessingTimes: Story = {
    args: {
        expandableType: ProductDetailType.PROCESSING_TIMES,
    },
};

export const PayoutDates: Story = {
    args: {
        expandableType: ProductDetailType.PAYOUT_DATES,
    },
};

export const Rates: Story = {
    args: {
        expandableType: ProductDetailType.RATES,
    },
};

export const DocumentationRequirements: Story = {
    args: {
        expandableType: 'documentation_requirements',
    },
};

export const IsOpen: Story = {
    args: {
        isOpenDefault: true,
    },
};
