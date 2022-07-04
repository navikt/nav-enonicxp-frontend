import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { FancyChevron } from '../../_common/chevron/FancyChevron';
import { classNames } from '../../../utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';

import style from './FrontpageShortcuts.module.scss';
import chevronStyle from '../../_common/chevron/FancyChevronCommon.module.scss';

export const FrontpageShortcuts = ({ config }: FrontpageShortcutsProps) => {
    const { contentList, title } = config;

    const links = contentList?.data?.sectionContents;

    if (!links) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    const threeCols = links.length % 3 === 0;

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
            <div
                className={classNames(style.list, threeCols && style.threeCols)}
            >
                {links.map((item) => (
                    <LinkPanelNavnoSimple
                        href={item._path}
                        analyticsLinkGroup={title}
                        linkUnderline={'onHover'}
                        linkColor={'black'}
                        icon={<FancyChevron color={'blue'} scale={0.55} />}
                        className={classNames(
                            style.item,
                            chevronStyle.animateOnHover
                        )}
                        key={item._id}
                    >
                        {item.displayName}
                    </LinkPanelNavnoSimple>
                ))}
            </div>
        </div>
    );
};
