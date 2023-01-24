import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { FancyChevron } from '../../_common/chevron/FancyChevron';
import { classNames } from '../../../utils/classnames';
import { LinkPanelNavnoSimple } from '../../_common/linkpanel/LinkPanelNavnoSimple';
import { getUrlFromContent } from '../../../utils/links-from-content';

import style from './FrontpageShortcuts.module.scss';
import chevronStyle from '../../_common/chevron/FancyChevronCommon.module.scss';
import { MiniCard } from 'components/_common/card/MiniCard';

import { CardSize, CardType } from 'types/card';
import { FrontPageShortcutsCard } from './FrontpageShortcutsCard';

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
            <ul
                className={classNames(style.list, threeCols && style.threeCols)}
            >
                {links.map((item) => (
                    <li key={item._id}>
                        <FrontPageShortcutsCard
                            href={getUrlFromContent(item)}
                            text={item.displayName}
                            illustration={(item.data as any).illustration}
                            analyticsLinkGroup={title}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
