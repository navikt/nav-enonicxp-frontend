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
    '<p>Som hovedregel kan du ha rett til AAP hvis alt dette gjelder deg:&nbsp;</p>  <ul>  <li>Arbeidsevnen din er nedsatt med minst 50 prosent på grunn av sykdom eller skade.&nbsp;</li>  <li>Arbeidsevnen din er nedsatt til alle typer arbeid du er kvalifisert for.&nbsp;</li>  <li>Du trenger behandling for å bedre arbeidsevnen din, eller hjelp fra Nav&nbsp;for å beholde eller skaffe arbeid.</li>  <li>Du har vært medlem i folketrygden sammenhengende i minst 5 år når du søker om AAP.&nbsp;</li>  <li>Du er mellom 18 og 67 år.&nbsp;</li> </ul>  <p>Det er ikke et krav at du har mottatt sykepenger.</p>  <p>Du må selv <u>søke om AAP</u>. Du kan som hovedregel tidligst få AAP fra og med den dagen du søker, men i spesielle tilfeller kan du få fra tidligere dato.&nbsp;</p>';

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
