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

export const Default: Story = {
    args: {
        officeData: mockOfficeData,
        initialOpen: true,
    },
};

export const WithAdditionalInfo: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            telefonnummerKommentar: 'Telefontid: man-fre 09:00-15:00',
            spesielleOpplysninger: 'Tilgjengelig for rullestolbrukere',
            sosialeTjenester: 'Tilbyr sosialhjelp og økonomisk rådgivning',
        },
        initialOpen: true,
    },
};

export const WithMultipleContactChannels: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            brukerkontakt: {
                ...mockOfficeData.brukerkontakt,
                publikumskanaler: [
                    {
                        beskrivelse: 'Generelt',
                        telefon: '12345678',
                        epost: 'oslo@nav.no',
                        sortOrder: 1,
                    },
                    {
                        beskrivelse: 'Sosialhjelp',
                        telefon: '87654321',
                        epost: 'sosial.oslo@nav.no',
                        sortOrder: 2,
                    },
                ],
            },
        },
        initialOpen: true,
    },
};

export const WithAdditionalAddressInfo: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            beliggenhet: {
                gatenavn: 'Karl Johans gate',
                husnummer: '1',
                husbokstav: 'B',
                postnummer: '0154',
                poststed: 'OSLO',
            },
        },
        initialOpen: true,
    },
};
