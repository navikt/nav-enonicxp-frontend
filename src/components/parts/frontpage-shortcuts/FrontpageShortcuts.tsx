import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from '../../../utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';
import { getUrlFromContent } from '../../../utils/links-from-content';
import { StaticImage } from 'components/_common/image/StaticImage';

// kopi av ikoner som ligger under /www.nav.no/nav.no-ressurser/ikoner, som brukes inne på oversiktssidene
import saksbehandlingstider from '/public/gfx/front-page-shortcuts/saksbehandlingstider_nav_ikon.svg';
import utbetalingsdatoer from '/public/gfx/front-page-shortcuts/utbetalingsdatoer_nav_ikon.svg';
import pengestotter from '/public/gfx/front-page-shortcuts/pengestotter_og_tjenester_fra_a_til_a_nav_ikon.svg';
import soknader from '/public/gfx/front-page-shortcuts/soknader_og_skjema_nav_ikon.svg';
import arbeidsgiverMinside from '/public/gfx/front-page-shortcuts/arbeidsgiver_minside.svg';
import arbeidsgiverSoknader from '/public/gfx/front-page-shortcuts/arbeidsgiver_soknader.svg';
import arbeidsgiverTjenester from '/public/gfx/front-page-shortcuts/arbeidsgiver_tjenester.svg';

import style from './FrontpageShortcuts.module.scss';

const linkToIconDictionary = {
    saksbehandlingstider,
    utbetalingsdatoer,
    pengestotter,
    soknader,
    'min-side-arbeidsgiver': arbeidsgiverMinside,
    'soeknader/nb/bedrift': arbeidsgiverSoknader,
    'tjenester/nb/bedrift': arbeidsgiverTjenester,
};

export const FrontpageShortcuts = ({
    config,
    pageProps,
}: FrontpageShortcutsProps) => {
    const { contentList, title } = config;

    const { audience } = pageProps?.data;

    const links = contentList?.data?.sectionContents;

    if (!links) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    const getIcon = (path: string) => {
        const foundKey = Object.keys(linkToIconDictionary).find((key) =>
            path.includes(key)
        );
        return foundKey ? linkToIconDictionary[foundKey] : null;
    };

    const threeCols = links.length % 3 === 0;

    return (
        <div className={classNames(style.shortcuts, style[audience])}>
            <Header
                size="large"
                level="2"
                justify="left"
                className={style.header}
            >
                {title}
            </Header>
            <ul
                className={classNames(style.list, threeCols && style.threeCols)}
            >
                {links.map((item, index) => {
                    const icon = getIcon(item._path);
                    return (
                        <li key={item._id}>
                            <LinkPanelNavnoSimple
                                href={getUrlFromContent(item)}
                                linkUnderline={'none'}
                                analyticsLinkGroup={title}
                                icon={
                                    icon && (
                                        <StaticImage
                                            imageData={icon}
                                            width={64}
                                            height={64}
                                            alt={''}
                                        />
                                    )
                                }
                                className={classNames(
                                    style.item,
                                    style[`item_${audience}`]
                                )}
                            >
                                {item.displayName}
                            </LinkPanelNavnoSimple>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
