import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { ProductDetailType } from 'types/content-props/product-details';
import { OversiktItemListItem, OversiktSubItem } from 'types/content-props/oversikt-props';
import { PictogramsProps } from 'types/content-props/pictograms';
import { MediaType } from 'types/media';
import { OversiktListPanel } from './OversiktListPanel';

const baseIllustration: PictogramsProps = {
    type: ContentType.Pictograms,
    data: { icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }] },
};

const baseSubItems: OversiktSubItem[] = [
    {
        path: '/www.nav.no/skjemadetaljer/test',
        title: 'Søk om tolk',
        longTitle: 'Søk om tolk for første gang',
        ingress: 'Søknaden brukes hvis du søker om tolk første gang.',
        type: ContentType.ProductPage,
        formNumbers: ['NAV 01-01.01'],
    },
];

const basePanelDetails: OversiktItemListItem = {
    title: 'Arbeidsavklaringspenger (AAP)',
    sortTitle: 'Arbeidsavklaringspenger (AAP)',
    ingress: 'AAP skal sikre inntekt mens du får hjelp til å komme tilbake i arbeid.',
    url: '/www.nav.no/aap',
    type: ContentType.ProductPage,
    targetLanguage: 'no',
    anchorId: 'aap',
    area: [],
    taxonomy: [],
    subItems: baseSubItems,
    illustration: baseIllustration,
};

const meta = {
    component: OversiktListPanel,
    args: {
        panelDetails: basePanelDetails,
        oversiktType: 'application',
    },
} satisfies Meta<typeof OversiktListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TjenesterOversikt: Story = {
    args: {
        panelDetails: {
            ...basePanelDetails,
            ingress: 'Se alle tjenester og produkter innen dette området.',
        },
        oversiktType: ProductDetailType.ALL_PRODUCTS,
    },
};
