import type { Meta, StoryObj } from '@storybook/react';

import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ReadMorePart } from './ReadMorePart';

const meta = {
    component: ReadMorePart,
} satisfies Meta<typeof ReadMorePart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        config: { title: 'title', html: { processedHtml: 'test', macros: [] } },
        path: '',
        type: ComponentType.Part,
        descriptor: PartType.ReadMore,
    },
};
