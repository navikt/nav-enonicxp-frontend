import type { Meta, StoryObj } from '@storybook/react';
import { OfficeDetails } from './OfficeDetails';
import { mockOfficeData } from './mockData';

const meta = {
    component: OfficeDetails,
} satisfies Meta<typeof OfficeDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        officeData: mockOfficeData,
    },
};

export const WithReception: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            brukerkontakt: {
                ...mockOfficeData.brukerkontakt,
                publikumsmottak: [
                    {
                        officeType: 'NAV_KONTOR',
                        besoeksadresse: {
                            type: 'stedsadresse' as const,
                            gatenavn: 'Karl Johans gate',
                            husnummer: '1',
                            postnummer: '0154',
                            poststed: 'OSLO',
                        },
                        aapningstider: [
                            {
                                dag: 'Mandag',
                                fra: '09:00',
                                til: '15:00',
                            },
                            {
                                dag: 'Tirsdag',
                                fra: '09:00',
                                til: '15:00',
                            },
                        ],
                    },
                ],
            },
        },
    },
};

export const WithoutReception: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            brukerkontakt: {
                ...mockOfficeData.brukerkontakt,
                publikumsmottak: [],
            },
        },
    },
};

export const WithMultipleReceptions: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            brukerkontakt: {
                ...mockOfficeData.brukerkontakt,
                publikumsmottak: [
                    {
                        officeType: 'NAV_KONTOR',
                        besoeksadresse: {
                            type: 'stedsadresse' as const,
                            gatenavn: 'Karl Johans gate',
                            husnummer: '1',
                            postnummer: '0154',
                            poststed: 'OSLO',
                        },
                        aapningstider: [
                            {
                                dag: 'Mandag',
                                fra: '09:00',
                                til: '15:00',
                            },
                        ],
                    },
                    {
                        officeType: 'NAV_KONTOR',
                        besoeksadresse: {
                            type: 'stedsadresse' as const,
                            gatenavn: 'Storgata',
                            husnummer: '2',
                            postnummer: '0155',
                            poststed: 'OSLO',
                        },
                        aapningstider: [
                            {
                                dag: 'Mandag',
                                fra: '10:00',
                                til: '16:00',
                            },
                        ],
                    },
                ],
            },
        },
    },
};
