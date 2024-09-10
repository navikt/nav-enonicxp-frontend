import type { Meta, StoryObj } from '@storybook/react';

import { RelatedSituations } from './RelatedSituations';

const meta = {
    component: RelatedSituations,
} satisfies Meta<typeof RelatedSituations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Related situations',
        description: 'Beskrivelse av relaterte situasjoner',
        relatedSituations: [
            { _id: '1', _path: '', displayName: 'test', data: { title: 'En situasjon' } },
            { _id: '2', _path: '', displayName: 'test', data: { title: 'En annen situasjon' } },
        ],
    },
};
