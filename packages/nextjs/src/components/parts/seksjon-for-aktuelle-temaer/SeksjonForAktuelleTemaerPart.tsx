import React from 'react';
import { Heading } from 'components/_common/headers/Heading';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { LenkepanelNavno } from 'components/_common/lenkepanel/LenkepanelNavno/LenkepanelNavno';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { usePageContentProps } from 'store/pageContext';
import { getUrlFromContent } from 'utils/links-from-content';
import { MoreLink } from 'components/_common/moreLink/MoreLink';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ContentListData } from 'types/content-props/content-list-props';
import { LinkSelectable } from 'types/component-props/_mixins';
import style from './SeksjonForAktuelleTemaerPart.module.scss';

export type PartConfigSeksjonForAktuelleTemaer = {
    title: string;
    contentList?: { data: ContentListData };
    link: LinkSelectable;
    bgColor?: string;
    itemColor?: string;
};

export const SeksjonForAktuelleTemaerPart = ({
    config,
}: PartComponentProps<PartType.SeksjonForAktuelleTemaer>) => {
    const { language, editorView } = usePageContentProps();
    const { contentList, title, link, bgColor, itemColor } = config;

    if (!contentList?.data?.sectionContents?.length) {
        if (editorView) {
            return <EditorHelp text={'Velg en innholdsliste'} />;
        } else {
            return null;
        }
    }

    return (
        <section
            className={style.currentTopics}
            style={
                {
                    '--bg-color': bgColor,
                    '--item-color': itemColor,
                } as React.CSSProperties
            }
        >
            <Heading size={'large'} level={'2'} className={style.header}>
                {title}
            </Heading>
            <ul className={style.list}>
                {contentList.data.sectionContents.map((item) => {
                    const url = getUrlFromContent(item);
                    if (!url) {
                        return null;
                    }

                    const displayDate = getPublishedDateTime(item);

                    return (
                        <li key={item._id}>
                            <LenkepanelNavno
                                analyticsLinkGroup={title}
                                linkText={item.displayName}
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
                            </LenkepanelNavno>
                        </li>
                    );
                })}
            </ul>
            {link && <MoreLink analyticsGroup={title} link={link} />}
        </section>
    );
};
