import type { Meta, StoryObj } from '@storybook/react';

import { classNames } from 'utils/classnames';
import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import { ParsedHtml } from './ParsedHtml';

const meta = {
    component: ParsedHtml,
} satisfies Meta<typeof ParsedHtml>;

export default meta;

type Story = StoryObj<typeof meta>;

const withDefaultHtmlStyling = (Story: any) => (
    <div className={classNames(defaultHtml.html, 'parsedHtml')}>
        <Story />
    </div>
);

const ListExample =
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:&nbsp;</p>  <ul>  <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&nbsp;</li>  <li>Aduis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.&nbsp;</li> </ul>  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';

const HeaderExample =
    '<h4><strong>Første utbetaling</strong><strong></strong> </h4>\n\n<p>Du får første utbetaling etter at søknaden din er behandlet og godkjent.Vi etterbetaler pengene fra og med dagen du har rett til AAP. </p>\n\n<h4><strong>Regelmessige utbetalinger</strong> </h4>\n\n<p>For å få utbetalt AAP, må du sende inn <a href="content://699b4cec-5185-40aa-9186-3c067a6146c3"><u>meldekort</u></a> hver 14. dag. Pengene blir utbetalt 1-3 virkedager etter at vi har mottatt meldekortet. </p>\n\n<p>Det er viktig at du følger med på din<u> <a href="https://www.nav.no/nav.no-ressurser/lenker/selvbetjening/tjenester-pa-nav.no/dine-utbetalinger">utbetalingsoversikt</a></u>. Der kan du se når du har fått utbetalinger og hvor mye du har fått.</p>\n';

const AllExamples = ListExample + HeaderExample;

export const Default: Story = {
    args: {
        htmlProps: {
            processedHtml: AllExamples,
            macros: [],
        },
    },
};

export const WithStyling: Story = {
    decorators: [withDefaultHtmlStyling],
    args: {
        htmlProps: {
            processedHtml: AllExamples,
            macros: [],
        },
    },
};
