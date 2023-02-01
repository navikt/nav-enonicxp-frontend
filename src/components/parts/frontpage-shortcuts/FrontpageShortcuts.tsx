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
import { CardType } from 'types/card';

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
                        {/* <LinkPanelNavnoSimple
                            href={getUrlFromContent(item)}
                            linkUnderline={'none'}
                            analyticsLinkGroup={title}
                            linkColor={'black'}
                            icon={<FancyChevron color={'blue'} scale={0.55} />}
                            className={classNames(
                                style.item,
                                chevronStyle.animateOnHover
                            )}
                        >
                            {item.displayName}
                        </LinkPanelNavnoSimple> */}
                        <MiniCard
                            link={{
                                url: getUrlFromContent(item),
                                text: item.displayName,
                            }}
                            type={CardType.Overview}
                            illustration={(item.data as any).illustration}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
