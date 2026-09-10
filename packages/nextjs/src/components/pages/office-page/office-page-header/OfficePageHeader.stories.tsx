import type { Meta, StoryObj } from '@storybook/nextjs';

import { OfficePageHeader } from './OfficePageHeader';

const meta = {
    component: OfficePageHeader,
} satisfies Meta<typeof OfficePageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Nav ytre Søre Sunnmøre',
        officeDetails: {
            navn: 'Nav Hareid og Herøy',
            brukerkontakt: {
                publikumsmottak: [{ stedsbeskrivelse: 'Hareid' }, { stedsbeskrivelse: 'Herøy' }],
            },
            type: 'LOKAL',
        },
    },
};
