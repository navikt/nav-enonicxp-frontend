import type { Meta, StoryObj } from '@storybook/react';

import { PartType } from 'types/component-props/parts';
import { ComponentType, ComponentProps } from 'types/component-props/_component-common';
import { SectionNavigation } from './SectionNavigation';

const headerComponents: ComponentProps[] = [
    {
        descriptor: PartType.Header,
        path: '',
        type: ComponentType.Part,
        config: { title: 'Header H3', anchorId: 'headerh3', titleTag: 'h3' },
    },
    {
        descriptor: PartType.Header,
        path: '',
        type: ComponentType.Part,
        config: { title: 'Header H4', anchorId: 'headerh4', titleTag: 'h4' },
    },
    {
        descriptor: PartType.RelatedSituations,
        path: '',
        type: ComponentType.Part,
        config: { title: '', description: '' },
    },
];

const meta = {
    component: SectionNavigation,
} satisfies Meta<typeof SectionNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ariaLabel: 'I kapittel Hvem kan få?',
        introRegion: { name: 'intro', components: headerComponents },
        contentRegion: { name: 'content', components: headerComponents },
    },
};
