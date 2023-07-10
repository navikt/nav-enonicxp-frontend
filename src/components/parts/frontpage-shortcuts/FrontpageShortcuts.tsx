import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';
import { getAudience } from 'types/component-props/_mixins';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';

import style from './FrontpageShortcuts.module.scss';

export const FrontpageShortcuts = ({
    config,
    pageProps,
}: FrontpageShortcutsProps) => {
    const { shortcuts, title: sectionTitle, bgColor, hoverColor } = config;

    if (!shortcuts || shortcuts.length === 0) {
        return <EditorHelp text={'Velg minst en snarvei'} />;
    }

    const audience = getAudience(pageProps.data.audience);

    const threeCols = shortcuts.length % 3 === 0;

    return (
        <div
            className={classNames(style.shortcuts, style[audience])}
            style={
                {
                    '--bg-color': bgColor,
                    '--hover-color': hoverColor,
                } as React.CSSProperties
            }
        >
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
                    const { target, customIllustration, customTitle } = item;
                    if (!target?.data) {
                        return null;
                    }

                    const href = target.data.url || target._path;
                    const title =
                        customTitle || target.data.title || target.displayName;
                    const illustration =
                        customIllustration || target.data.illustration;

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
