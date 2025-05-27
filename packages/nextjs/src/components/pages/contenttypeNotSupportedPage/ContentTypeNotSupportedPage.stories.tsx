import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { ContentTypeNotSupportedPage } from './ContentTypeNotSupportedPage';

const meta = {
    component: ContentTypeNotSupportedPage,
} satisfies Meta<typeof ContentTypeNotSupportedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: ContentType.Error,
    },
};
