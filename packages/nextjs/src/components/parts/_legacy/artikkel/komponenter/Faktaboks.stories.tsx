import type { Meta, StoryObj } from '@storybook/react';
import { Faktaboks } from './Faktaboks';

const meta = {
    component: Faktaboks,
} satisfies Meta<typeof Faktaboks>;

export default meta;

type Story = StoryObj<typeof meta>;

const fakta = {
    processedHtml:
        '<p>NAV forvalter en tredjedel av statsbudsjettet gjennom ordninger som dagpenger, arbeidsavklaringspenger, sykepenger, pensjon, barnetrygd og kontantstøtte.</p><p>NAV har om lag 19 000 medarbeidere, herav om lag 14 000 i Arbeids- og velferdsetaten og om lag 5 000 i kommunene.</p>',
    macros: [],
};

export const Version1: Story = {
    args: {
        label: 'Fakta om NAV',
        fakta,
        version: '1',
    },
};

export const Version2: Story = {
    args: {
        label: 'Fakta om NAV',
        fakta,
        version: '2',
    },
};
