import type { Meta, StoryObj } from '@storybook/react';

import { classNames } from 'utils/classnames';
import defaultHtml from 'components/_common/parsed-html/DefaultHtmlStyling.module.scss';
import { MacroType } from 'types/macro-props/_macros-common';
import { ParsedHtml } from './ParsedHtml';

const withWrapperClassnames = (Story: any) => (
    <div className={classNames(defaultHtml.html, 'parsedHtml')}>
        <Story />
    </div>
);

const meta = {
    component: ParsedHtml,
    decorators: [withWrapperClassnames],
} satisfies Meta<typeof ParsedHtml>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        htmlProps: {
            processedHtml:
                '<p>Som hovedregel kan du ha rett til AAP hvis alt dette gjelder deg:&nbsp;</p>  <ul>  <li>Arbeidsevnen din er nedsatt med minst 50 prosent på grunn av sykdom eller skade.&nbsp;</li>  <li>Arbeidsevnen din er nedsatt til alle typer arbeid du er kvalifisert for.&nbsp;</li>  <li>Du trenger behandling for å bedre arbeidsevnen din, eller hjelp fra Nav&nbsp;for å beholde eller skaffe arbeid.</li>  <li>Du har vært medlem i folketrygden sammenhengende i minst 5 år når du søker om AAP.&nbsp;</li>  <li>Du er mellom 18 og 67 år.&nbsp;</li> </ul>  <p>Det er ikke et krav at du har mottatt sykepenger.</p>  <p>Du må selv <u>søke om AAP</u>. Du kan som hovedregel tidligst få AAP fra og med den dagen du søker, men i spesielle tilfeller kan du få fra tidligere dato.&nbsp;</p>',
            macros: [],
        },
    },
};

export const WithMacro: Story = {
    args: {
        htmlProps: {
            processedHtml:
                'Med AAP-kalkulatoren ser du omtrent hva du kan få i AAP. [product-card-mini targetPage="0a21071f-0a12-4865-8be1-e256afc3c86c"/]',
            macros: [
                { name: MacroType.ProductCardMini, ref: '0a21071f-0a12-4865-8be1-e256afc3c86c' },
            ],
        },
    },
};
