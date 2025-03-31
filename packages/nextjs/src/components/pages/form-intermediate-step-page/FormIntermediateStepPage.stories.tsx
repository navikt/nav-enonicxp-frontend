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
                processedHtml: '<p>Hva vil du gjøre?</p>',
                macros: [],
            },
            steps: [
                {
                    label: 'Finn ledige stillinger',
                    explanation:
                        'Finn ledige stillinger, registrer CV og jobbprofil på Arbeidsplassen',
                    nextStep: {
                        _selected: 'next',
                    },
                },
                {
                    label: 'Finn ledige stillinger',
                    explanation:
                        'Finn ledige stillinger, registrer CV og jobbprofil på Arbeidsplassen',
                    nextStep: {
                        _selected: 'next',
                    },
                },
            ],
        },
    },
};
