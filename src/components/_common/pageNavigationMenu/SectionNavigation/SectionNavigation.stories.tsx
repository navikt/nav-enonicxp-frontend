import type { Meta, StoryObj } from '@storybook/react';

import { PartType } from 'types/component-props/parts';
import { ComponentType } from 'types/component-props/_component-common';
import { SectionNavigation } from './SectionNavigation';

const meta = {
    component: SectionNavigation,
} satisfies Meta<typeof SectionNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        introRegion: {
            name: 'intro',
            components: [
                {
                    descriptor: PartType.Header,
                    path: '',
                    type: ComponentType.Part,
                    config: { title: 'Header H3', anchorId: 'headerh3', titleTag: 'h3' },
                },
            ],
        },
    },
};
