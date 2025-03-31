import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { FormIntermediateStepPage } from './FormIntermediateStepPage';

const meta = {
    component: FormIntermediateStepPage,
} satisfies Meta<typeof FormIntermediateStepPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        _path: 'placeholder',
        language: 'no',
        displayName: 'Form Intermediate Step',
        type: ContentType.FormIntermediateStepPage,
        data: {
            textAboveTitle: 'Forrige side',
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
            editorial: {
                processedHtml: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                macros: [],
            },
            steps: [
                {
                    label: 'Tittel',
                    explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    languageDisclaimer: 'Info om språk',
                    nextStep: {
                        _selected: 'next',
                    },
                },
                {
                    label: 'Tittel',
                    explanation:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    formNumberStepData: 'NAV 01-02.03',
                    nextStep: {
                        _selected: 'next',
                    },
                },
                {
                    label: 'Tittel',
                    nextStep: {
                        _selected: 'next',
                    },
                },
            ],
        },
    },
};
