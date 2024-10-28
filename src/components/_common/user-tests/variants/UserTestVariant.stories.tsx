//Dette er del 1. TODO: Publicview
import type { Meta, StoryObj } from '@storybook/react';
import { UserTestVariant } from './UserTestVariant';

const meta = {
    component: UserTestVariant,
} satisfies Meta<typeof UserTestVariant>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
    args: {
        testsData: {
            title: 'Vil du hjelpe oss å forbedre nettsidene våre?',
            ingress: 'Testen er frivillig og anonym. Testen tar ca 5 minutter.',
            cookieId: 'tretest-feb24',
            variants: [],
        },
        variant: {
            id: 'tretest-feb24-variant2',
            url: 'https://study.uxtweak.com/firstclick/2q3KjTBKjUErX90Ui7BDE',
            linkText: 'Delta i testen',
            percentage: 100,
        },
    },
};
