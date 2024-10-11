import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { RelatedSituations } from './RelatedSituations';

const meta = {
    component: RelatedSituations,
} satisfies Meta<typeof RelatedSituations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        relatedSituations: [
            {
                language: 'no',
                type: ContentType.SituationPage,
                _path: '',
                _id: '',
                displayName: 'test',
                data: { taxonomy: [], title: 'test' },
            },
        ],
        title: 'Andre tilbud',
        description: 'Mer informasjon til deg som',
    },
};
