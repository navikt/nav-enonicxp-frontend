import type { Meta, StoryObj } from '@storybook/react';

import { PressTopSection } from './PressTopSection';

const meta = {
    component: PressTopSection,
} satisfies Meta<typeof PressTopSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        page: {
            displayName: 'PressTopSection',
            data: {
                title: 'Presse',
                pressCall: {
                    processedHtml:
                        '<h2>Pressevakt</h2>\n\n<p><strong>E-post</strong>: <a href="mailto:presse@nav.no">presse@nav.no</a><br />\n<strong>Telefon</strong>: <a href="tel:40003144">40 00 31 44</a> (SMS besvares ikke) <br />\n<a href="https://www.nav.no/samarbeidspartner/pressevakt#pressevakt-direktoratet">Åpningstider pressevakt m.m.</a> </p>\n\n<p><a href="https://www.nav.no/samarbeidspartner/pressevakt#pressevakt-fylke">Pressevakter i fylkene</a></p>\n',
                    macros: [],
                },
            },
        },
    },
};
