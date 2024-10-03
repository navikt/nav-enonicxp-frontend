import type { Meta, StoryObj } from '@storybook/react';

import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ReadMorePart } from './ReadMorePart';

const meta = {
    component: ReadMorePart,
    args: { type: ComponentType.Part, descriptor: PartType.ReadMore },
} satisfies Meta<typeof ReadMorePart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        config: { title: 'Read More', html: { processedHtml: 'test', macros: [] } },
        path: '',
    },
};
