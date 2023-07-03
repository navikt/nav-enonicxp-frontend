import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import classNames from 'classnames';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { MainArticleChapterNavigationData } from 'types/content-props/main-article-chapter-props';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './MainArticleChapterNavigation.module.scss';

// If the chapter points to any content other than a main-article, we want
// to link directly to the content instead, rather than try to render it
// as a chapter
const getChapterPath = (chapter: MainArticleChapterNavigationData) =>
    !chapter.data?.article ||
    chapter.data.article.type === ContentType.MainArticle
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

export const MainArticleChapterNavigation = (props: ContentProps) => {
    const { language } = usePageConfig();

    const chapters = getChapters(props);
    if (!chapters || chapters.length === 0) {
        return null;
    }

    const getLabel = translator('mainArticle', language);

    const currentPath = stripXpPathPrefix(props._path);
    const parentPath = stripXpPathPrefix(props.parent?._path || props._path);
    const parentTitle = props.parent?.displayName || props.displayName;
    const parentSelected = parentPath === currentPath;

    return (
        <nav className={style.mainArticleChapterNavigation}>
            <Heading level="2" size="medium" className={style.title}>
                {getLabel('contents')}
            </Heading>
            <ul>
                <li>
                    {parentSelected ? (
                        <BodyShort
                            className={classNames(style.item, style.active)}
                        >
                            {parentTitle}
                        </BodyShort>
                    ) : (
                        <LenkeBase href={parentPath} className={style.item}>
                            {parentTitle}
                        </LenkeBase>
                    )}
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = stripXpPathPrefix(
                        getChapterPath(chapter)
                    );
                    const chapterSelected = currentPath === chapterPath;

                    return (
                        <li key={chapter._path}>
                            {chapterSelected ? (
                                <BodyShort
                                    className={classNames(
                                        style.item,
                                        style.active
                                    )}
                                >
                                    {chapter.displayName}
                                </BodyShort>
                            ) : (
                                <LenkeBase
                                    href={chapterPath}
                                    className={style.item}
                                >
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
