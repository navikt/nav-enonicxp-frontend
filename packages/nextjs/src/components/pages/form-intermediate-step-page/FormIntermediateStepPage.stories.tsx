import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { FormIntermediateStepPage } from './FormIntermediateStepPage';

const meta = {
    component: FormIntermediateStepPage,
} satisfies Meta<typeof FormIntermediateStepPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const valg1 = {
    label: 'Valg 1',
    explanation: 'Ingress til valg 1',
    languageDisclaimer: 'Info om språk',
    nextStep: {
        _selected: 'next' as const,
        next: {
            steps: [
                {
                    label: 'Neste steg',
                    explanation: 'Dette er neste steg',
                    nextStep: {
                        _selected: 'next' as const,
                    },
                },
            ],
        },
    },
};

export const LandingPage: Story = {
    args: {
        _path: 'placeholder',
        language: 'no',
        displayName: 'Form Intermediate Step',
        type: ContentType.FormIntermediateStepPage,
        data: {
            title: 'Landingsside',
            illustration: {
                type: ContentType.Pictograms,
                data: {
                    icons: [
                        {
                            icon: {
                                type: MediaType.Vector,
                                mediaUrl: 'placeholder',
                            },
                        },
                    ],
                },
            },
            editorial: {
                processedHtml: '<p>Ingress til landingsside.</p>',
                macros: [],
            },
            steps: [
                valg1,
                {
                    label: 'Valg 3',
                    explanation:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    formNumberStepData: 'NAV 01-02.03',
                    nextStep: {
                        _selected: 'next' as const,
                    },
                },
                {
                    label: 'Valg 3',
                    nextStep: {
                        _selected: 'next' as const,
                    },
                },
            ],
        },
    },
};

export const Step: Story = {
    args: {
        _path: '/form-intermediate-step',
        language: 'no',
        displayName: 'placeholder',
        type: ContentType.FormIntermediateStepPage,
        data: {
            title: 'Tittel',
            illustration: {
                type: ContentType.Pictograms,
                data: {
                    icons: [
                        {
                            icon: {
                                type: MediaType.Vector,
                                mediaUrl: 'placeholder',
                            },
                        },
                    ],
                },
            },
            steps: [valg1],
        },
    },
    parameters: {
        nextjs: {
            router: {
                asPath: '/form-intermediate-step?stegvalg=0',
            },
        },
    },
};
