import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';
import { LinkPanelNavnoSimple } from 'components/_common/linkpanel/LinkPanelNavnoSimple/LinkPanelNavnoSimple';
import { getAudience } from 'types/component-props/_mixins';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { PictogramsProps } from 'types/content-props/pictograms';

import style from './FrontpageShortcuts.module.scss';

type Shortcut = {
    target: {
        _path: string;
        displayName: string;
        data: {
            url?: string;
            illustration?: PictogramsProps;
            title?: string;
        };
    };
    customTitle: string;
    customIllustration?: PictogramsProps;
};

export type PartConfigFrontpageShortcuts = {
    title?: string;
    bgColor?: string;
    itemColor?: string;
    hoverColor?: string;
    shortcuts: Shortcut[];
};

export const FrontpageShortcutsPart = ({
    config,
}: PartComponentProps<PartType.FrontpageShortcuts>) => {
    const pageProps = usePageContentProps();

    const { shortcuts, title: sectionTitle, bgColor, itemColor, hoverColor } = config;

    if (!shortcuts || shortcuts.length === 0) {
        return <EditorHelp text={'Velg minst en snarvei'} />;
    }

    const audience = getAudience(pageProps.data?.audience);

    const threeCols = shortcuts.length % 3 === 0;

    return (
        <section
            className={classNames(style.shortcuts, audience && style[audience])}
            style={
                {
                    '--bg-color': bgColor,
                    '--item-color': itemColor,
                    '--hover-color': hoverColor,
                } as React.CSSProperties
            }
        >
            {sectionTitle && (
                <Header size="large" level="2" className={style.header}>
                    {sectionTitle}
                </Header>
            )}
            <ul className={classNames(style.list, threeCols && style.threeCols)}>
                {shortcuts.map((item) => {
                    const { target, customIllustration, customTitle } = item;
                    if (!target?.data) {
                        return null;
                    }

                    const href = target.data.url || target._path;
                    const title = customTitle || target.data.title || target.displayName;
                    const illustration = customIllustration || target.data.illustration;

                    return (
                        <li key={title}>
                            <LinkPanelNavnoSimple
                                href={href}
                                analyticsLinkGroup={sectionTitle}
                                icon={<IllustrationStatic illustration={illustration} />}
                                className={classNames(
                                    style.item,
                                    audience && style[`item_${audience}`]
                                )}
                            >
                                {title}
                            </LinkPanelNavnoSimple>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
