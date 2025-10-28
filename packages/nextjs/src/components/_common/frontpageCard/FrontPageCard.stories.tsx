import type { Meta, StoryObj } from '@storybook/react';

import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { FrontPageCard } from './FrontPageCard';

const meta = {
    component: FrontPageCard,
    args: {
        path: '',
        title: 'Title',
        illustration: {
            type: ContentType.Pictograms,
            data: { icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }] },
        },
    },
} satisfies Meta<typeof FrontPageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

//I bruk på engelsk forside
export const Person: Story = {
    args: { type: CardType.PersonFrontPage },
};

export const Employer: Story = {
    args: { type: CardType.EmployerFrontpage },
};

export const Provider: Story = {
    args: { type: CardType.ProviderFrontpage },
};
