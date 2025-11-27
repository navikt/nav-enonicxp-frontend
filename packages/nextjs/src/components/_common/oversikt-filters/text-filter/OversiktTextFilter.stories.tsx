import React from 'react';
import { Provider } from 'react-redux';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Decorator } from '@storybook/react';
import { mockStore } from 'store/store';

import { OversiktTextFilter } from './OversiktTextFilter';

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

const meta = {
    component: OversiktTextFilter,
    decorators: [withStore],
} satisfies Meta<typeof OversiktTextFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
