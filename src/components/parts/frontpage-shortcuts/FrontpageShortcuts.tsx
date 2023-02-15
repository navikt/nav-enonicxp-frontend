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

import style from './FrontpageShortcuts.module.scss';

export const FrontpageShortcuts = ({ config }: FrontpageShortcutsProps) => {
    const { contentList, title } = config;

    const links = contentList?.data?.sectionContents;

    if (!links) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    const threeCols = links.length % 3 === 0;

    const icons = [
        saksbehandlingstider,
        utbetalingsdatoer,
        pengestotter,
        soknader,
    ];

    return (
        <div className={style.shortcuts}>
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
                {links.map((item, index) => (
                    <li key={item._id}>
                        <LinkPanelNavnoSimple
                            href={getUrlFromContent(item)}
                            linkUnderline={'none'}
                            analyticsLinkGroup={title}
                            icon={
                                <StaticImage
                                    imageData={icons[index]}
                                    width={64}
                                    height={64}
                                    alt={''}
                                />
                            }
                            className={classNames(style.item)}
                        >
                            {item.displayName}
                        </LinkPanelNavnoSimple>
                    </li>
                ))}
            </ul>
        </div>
    );
};
