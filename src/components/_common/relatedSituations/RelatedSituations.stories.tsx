import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { ProductTaxonomy } from 'types/taxonomies';
import { Audience } from 'types/component-props/_mixins';
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
                displayName: '',
                data: {
                    taxonomy: [ProductTaxonomy.COUNSELLING],
                    title: 'Trenger hjelp til å komme i jobb',
                    audience: {
                        _selected: Audience.PERSON,
                        [Audience.PERSON]: {},
                        [Audience.EMPLOYER]: {},
                        [Audience.PROVIDER]: {},
                    },
                },
            },
            {
                language: 'no',
                type: ContentType.ProductPage,
                _path: '',
                _id: '',
                displayName: '',
                data: {
                    taxonomy: [],
                    title: 'Side med tilbud',
                    audience: {
                        _selected: Audience.PERSON,
                        [Audience.PERSON]: {},
                        [Audience.EMPLOYER]: {},
                        [Audience.PROVIDER]: {},
                    },
                },
            },
        ],
        title: 'Andre tilbud',
        description: 'Mer informasjon til deg som',
    },
};
