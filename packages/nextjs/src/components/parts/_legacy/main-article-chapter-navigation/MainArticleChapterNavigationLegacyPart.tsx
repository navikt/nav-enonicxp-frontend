import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { MainArticleChapterNavigationData } from 'types/content-props/main-article-chapter-props';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { usePageContentProps } from 'store/pageContext';

import style from './MainArticleChapterNavigation.module.scss';

// If the chapter points to any content other than a main-article, we want
// to link directly to the content instead, rather than try to render it
// as a chapter
const getChapterPath = (chapter: MainArticleChapterNavigationData) =>
    !chapter.data?.article || chapter.data.article.type === ContentType.MainArticle
        ? chapter._path
        : chapter.data.article._path;

const getChapters = (contentProps: ContentProps) => {
    if (contentProps.type === ContentType.MainArticle) {
        return contentProps.data?.chapters;
    }

    if (contentProps.type === ContentType.MainArticleChapter) {
        return contentProps.parent?.data?.chapters;
    }

    return null;
};

export const MainArticleChapterNavigationLegacyPart = (props: ContentProps) => {
    const { language } = usePageContentProps();
    const chapters = getChapters(props);
    if (!chapters || chapters.length === 0) {
        return null;
    }
    const getLabel = translator('mainArticle', language);
    const currentPath = stripXpPathPrefix(props._path);
    const parentPath = stripXpPathPrefix(props.parent?._path || props._path);
    const parentTitle = props.parent?.displayName || props.displayName;
    const parentSelected = parentPath === currentPath;
    const headingId = `heading-chapter-navigation`;

    return (
        <nav className={style.mainArticleChapterNavigation} aria-labelledby={headingId}>
            <Heading id={headingId} level="2" size="medium" className={style.title}>
                {getLabel('contents')}
            </Heading>
            <ul>
                <li>
                    {parentSelected ? (
                        <BodyLong className={classNames(style.item, style.active)}>
                            {parentTitle}
                        </BodyLong>
                    ) : (
                        <LenkeBase href={parentPath} className={style.item}>
                            {parentTitle}
                        </LenkeBase>
                    )}
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = stripXpPathPrefix(getChapterPath(chapter));
                    const chapterSelected = currentPath === chapterPath;

                    return (
                        <li key={chapter._path}>
                            {chapterSelected ? (
                                <BodyLong className={classNames(style.item, style.active)}>
                                    {chapter.displayName}
                                </BodyLong>
                            ) : (
                                <LenkeBase href={chapterPath} className={style.item}>
                                    {chapter.displayName}
                                </LenkeBase>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
