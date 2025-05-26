import type { Meta, StoryObj } from '@storybook/react';

import { OfficeInformation } from './OfficeInformation';

const meta = {
    component: OfficeInformation,
} satisfies Meta<typeof OfficeInformation>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockOfficeData = {
    enhetNr: '1234',
    type: 'NAV_KONTOR',
    telefonnummer: '12345678',
    navn: 'NAV Oslo',
    organisasjonsnummer: '987654321',
    status: 'AKTIV',
    beliggenhet: {
        type: 'stedsadresse' as const,
        gatenavn: 'Karl Johans gate',
        husnummer: '1',
        postnummer: '0154',
        poststed: 'OSLO',
    },
    postadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Postboks',
        husnummer: '1234',
        postnummer: '0103',
        poststed: 'OSLO',
    },
    brukerkontakt: {
        spraakdrakt: 'NB' as const,
        publikumsmottak: [],
        publikumskanaler: {
            beskrivelse: 'Kontakt oss',
            telefon: '12345678',
            epost: 'oslo@nav.no',
            sortOrder: 1,
        },
    },
};

export const Open: Story = {
    args: {
        officeData: mockOfficeData,
        initialOpen: true,
    },
};

export const Closed: Story = {
    args: {
        officeData: mockOfficeData,
        initialOpen: false,
    },
};
