import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from '../../../utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';
import { getUrlFromContent } from '../../../utils/links-from-content';
import { StaticImage } from 'components/_common/image/StaticImage';
import { getAudience } from 'types/component-props/_mixins';

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

const linkToIconDictionary = {
    person: {
        saksbehandlingstider: saksbehandlingstider,
        utbetalingsdatoer: utbetalingsdatoer,
        tjenester: pengestotter,
        'soknader/nb/person': soknader,
    },
    employer: {
        'min-side-arbeidsgiver': arbeidsgiverMinside,
        'soknader/nb/bedrift': arbeidsgiverSoknader,
        tilganger: arbeidsgiverTjenester,
    },
};

export const FrontpageShortcuts = ({
    config,
    pageProps,
}: FrontpageShortcutsProps) => {
    const { contentList, title } = config;

    const audience = getAudience(pageProps?.data?.audience);

    const links = contentList?.data?.sectionContents;

    if (!links) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    const getIcon = (content: ContentProps) => {
        const dictionary = linkToIconDictionary[audience];
        const foundKey = Object.keys(dictionary).find((key) => {
            if (content.type === ContentType.ExternalLink) {
                return content.data.url?.includes(key);
            }

            return content._path.includes(key);
        });
        return foundKey ? dictionary[foundKey] : null;
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
                    const icon = getIcon(item);
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
