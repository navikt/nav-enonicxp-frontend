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
                    label: 'Valg 1.1',
                    explanation: 'Ingress til valg 1.1',
                    nextStep: {
                        _selected: 'next' as const,
                    },
                },
                {
                    label: 'Valg 1.2',
                    explanation: 'Ingress til valg 1.2',
                    nextStep: {
                        _selected: 'next' as const,
                    },
                },
            ],
        },
    },
};

const valg2 = {
    label: 'Valg 2',
    explanation:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    formNumberStepData: 'NAV 01-02.03',
    nextStep: {
        _selected: 'next' as const,
    },
};

const valg3 = {
    label: 'Valg 3',
    nextStep: {
        _selected: 'next' as const,
    },
};

export const LandingPage: Story = {
    args: {
        _path: 'placeholder',
        type: ContentType.FormIntermediateStepPage,
        data: {
            title: 'Landingsside',
            // @ts-ignore
            editorial: '<p>Hva vil du gjøre?</p>',
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
            steps: [valg1, valg2, valg3],
        },
    },
};

export const Step: Story = {
    args: {
        ...LandingPage.args,
        data: {
            ...LandingPage.args.data,
            steps: [valg1],
        },
    },
    parameters: {
        nextjs: {
            router: {
                asPath: '/placeholder?stegvalg=0',
            },
        },
    },
};

export const EditorView: Story = {
    args: {
        ...LandingPage.args,
        editorView: 'edit',
    },
};
