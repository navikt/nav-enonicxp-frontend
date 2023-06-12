import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';
import { getAudience } from 'types/component-props/_mixins';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';

// kopi av ikoner som ligger under /www.nav.no/nav.no-ressurser/ikoner, som brukes inne på oversiktssidene
import saksbehandlingstider from '/public/gfx/front-page-shortcuts/saksbehandlingstider_nav_ikon.svg';
import utbetalingsdatoer from '/public/gfx/front-page-shortcuts/utbetalingsdatoer_nav_ikon.svg';
import pengestotter from '/public/gfx/front-page-shortcuts/pengestotter_og_tjenester_fra_a_til_a_nav_ikon.svg';
import soknader from '/public/gfx/front-page-shortcuts/soknader_og_skjema_nav_ikon.svg';
import arbeidsgiverMinside from '/public/gfx/front-page-shortcuts/arbeidsgiver_minside.svg';
import arbeidsgiverSoknader from '/public/gfx/front-page-shortcuts/arbeidsgiver_soknader.svg';
import arbeidsgiverTjenester from '/public/gfx/front-page-shortcuts/arbeidsgiver_tjenester.svg';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

import style from './FrontpageShortcuts.module.scss';

export const FrontpageShortcuts = ({
    config,
    pageProps,
}: FrontpageShortcutsProps) => {
    const { shortcuts, title: sectionTitle } = config;

    if (!shortcuts || shortcuts.length === 0) {
        return <EditorHelp text={'Velg minst en snarvei'} />;
    }

    const audience = getAudience(pageProps?.data?.audience);

    const threeCols = shortcuts.length % 3 === 0;

    return (
        <div className={classNames(style.shortcuts, style[audience])}>
            <Header
                size="large"
                level="2"
                justify="left"
                className={style.header}
            >
                {sectionTitle}
            </Header>
            <ul
                className={classNames(style.list, threeCols && style.threeCols)}
            >
                {shortcuts.map((item) => {
                    const { target, illustration, title: shortcutTitle } = item;

                    const href = target.data?.url || target._path;
                    const title = shortcutTitle || target.displayName;

                    return (
                        <li key={title}>
                            <LinkPanelNavnoSimple
                                href={href}
                                linkUnderline={'none'}
                                analyticsLinkGroup={title}
                                icon={
                                    <IllustrationStatic
                                        illustration={illustration}
                                    />
                                }
                                className={classNames(
                                    style.item,
                                    style[`item_${audience}`]
                                )}
                            >
                                {title}
                            </LinkPanelNavnoSimple>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
