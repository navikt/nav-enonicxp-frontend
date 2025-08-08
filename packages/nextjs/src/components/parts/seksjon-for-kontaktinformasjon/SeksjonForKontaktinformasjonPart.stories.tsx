import type { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ContentType } from 'types/content-props/_content-common';
import { SeksjonForKontaktinformasjonPart } from './SeksjonForKontaktinformasjonPart';

const meta = {
    component: SeksjonForKontaktinformasjonPart,
    args: { type: ComponentType.Part, descriptor: PartType.SeksjonForKontaktinformasjon, path: '' },
} satisfies Meta<typeof SeksjonForKontaktinformasjonPart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        config: {
            title: 'Kontakt oss',
            chatTitle: 'Chat med oss',
            chatIngress: 'Har du spørsmål? Vi er her for å hjelpe deg.',
            sharedContactInformation: [
                {
                    type: ContentType.ContactInformationPage,
                    _id: 'contact-1',
                    _path: '/kontakt/chat',
                    displayName: 'Kontakt oss',
                    language: 'no',
                    createdTime: '2024-06-01T08:00:00Z',
                    modifiedTime: '2024-06-01T10:00:00Z',
                    data: {
                        contactType: {
                            chat: {
                                title: 'Chat med kundeservice',
                                specialOpeningHours: {
                                    validFrom: '8',
                                    validTo: '10',
                                },
                            },
                        },
                    },
                },
            ],
            contactUsTitle: 'Du kan også ringe eller skrive til oss',
            contactUsIngress: 'For mer informasjon, vennligst besøk vår kontaktside.',
            contactUsLink: {
                type: ContentType.ExternalLink,
                data: { url: 'https://www.example.com/kontakt' },
            },
        },
    },
};

export const Alert: Story = {
    args: {
        config: {
            title: 'Kontakt oss',
            chatTitle: 'Chat med oss',
            chatIngress: 'Har du spørsmål? Vi er her for å hjelpe deg.',
            chatAlertText: 'Vi er her for å hjelpe deg med dine spørsmål.',
            sharedContactInformation: [
                {
                    type: ContentType.ContactInformationPage,
                    _id: 'contact-1',
                    _path: '/kontakt/chat',
                    displayName: 'Kontakt oss',
                    language: 'no',
                    createdTime: '2024-06-01T08:00:00Z',
                    modifiedTime: '2024-06-01T10:00:00Z',
                    data: {
                        contactType: {
                            chat: {
                                title: 'Chat med kundeservice',
                                specialOpeningHours: {
                                    validFrom: '8',
                                    validTo: '10',
                                },
                            },
                        },
                    },
                },
            ],
            contactUsTitle: 'Du kan også ringe eller skrive til oss',
            contactUsAlertText: 'Du kan kontakte oss via e-post eller telefon.',
            contactUsIngress: 'For mer informasjon, vennligst besøk vår kontaktside.',
            contactUsLink: {
                type: ContentType.ExternalLink,
                data: { url: 'https://www.example.com/kontakt' },
            },
        },
    },
};
