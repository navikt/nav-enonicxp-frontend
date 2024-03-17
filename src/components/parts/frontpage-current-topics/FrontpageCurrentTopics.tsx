import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageCurrentTopicsProps } from '../../../types/component-props/part-configs/frontpage-current-topics';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { formatDate } from 'utils/datetime';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { getUrlFromContent } from 'utils/links-from-content';
import { MoreLink } from 'components/_common/moreLink/MoreLink';

import style from './FrontpageCurrentTopics.module.scss';

export const FrontpageCurrentTopics = ({
    config,
}: FrontpageCurrentTopicsProps) => {
    const { language } = usePageConfig();
    const { contentList, title, link } = config;

    if (!contentList?.data.sectionContents) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    return (
        <div className={style.currentTopics}>
            <Header
                size={'large'}
                level={'2'}
                justify={'left'}
                className={style.header}
            >
                {title}
            </Header>
            <ul className={style.list}>
                {contentList.data.sectionContents.map((item) => {
                    const url = getUrlFromContent(item);
                    if (!url) {
                        return null;
                    }

                    return (
                        <li key={item._id}>
                            <LinkPanelNavno
                                analyticsLinkGroup={title}
                                linkText={item.displayName}
                                linkTextSize={'medium'}
                                linkColor={'black'}
                                href={url}
                                className={style.item}
                            >
                                <span className={style.date}>
                                    {formatDate({
                                        datetime: item.modifiedTime,
                                        language: language,
                                        short: true,
                                        year: true,
                                    })}
                                </span>
                            </LinkPanelNavno>
                        </li>
                    );
                })}
            </ul>
            {link && <MoreLink link={link} />}
        </div>
    );
};
