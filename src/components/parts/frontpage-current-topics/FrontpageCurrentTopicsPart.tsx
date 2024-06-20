import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from 'components/_common/linkpanel/LinkPanelNavno';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { usePageContentProps } from 'store/pageContext';
import { getUrlFromContent } from 'utils/links-from-content';
import { MoreLink } from 'components/_common/moreLink/MoreLink';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ContentListData } from 'types/content-props/content-list-props';
import { LinkSelectable } from 'types/component-props/_mixins';

import style from './FrontpageCurrentTopics.module.scss';

export type PartConfigFrontpageCurrentTopics = {
    title: string;
    contentList?: { data: ContentListData };
    link: LinkSelectable;
};

export const FrontpageCurrentTopicsPart = ({
    config,
}: PartComponentProps<PartType.FrontpageCurrentTopics>) => {
    const { language } = usePageContentProps();
    const { contentList, title, link } = config;

    if (!contentList?.data.sectionContents) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    return (
        <div className={style.currentTopics}>
            <Header size={'large'} level={'2'} className={style.header}>
                {title}
            </Header>
            <ul className={style.list}>
                {contentList.data.sectionContents.map((item) => {
                    const url = getUrlFromContent(item);
                    if (!url) {
                        return null;
                    }

                    const displayDate = getPublishedDateTime(item);

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
                                        datetime: displayDate,
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
