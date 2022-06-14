import React from 'react';
import { Heading, Label } from '@navikt/ds-react';
import { translator } from 'translations';
import classNames from 'classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { MainArticleChapterNavigationData } from '../../../../types/content-props/main-article-chapter-props';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './MainArticleChapterNavigation.module.scss';

// If the chapter points to any content other than a main-article, we want
// to link directly to the content instead, rather than try to render it
// as a chapter
const getChapterPath = (chapter: MainArticleChapterNavigationData) =>
    !chapter.data?.article ||
    chapter.data.article.__typename === ContentType.MainArticle
        ? chapter._path
        : chapter.data.article._path;

export const MainArticleChapterNavigation = (props: ContentProps) => {
    const { language } = usePageConfig();
    const getLabel = translator('mainArticle', language);
    const chapters = props.data?.chapters || props.parent?.data?.chapters || [];

    if (chapters.length === 0) {
        return null;
    }

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
                        <Label className={classNames(style.item, style.active)}>
                            {parentTitle}
                        </Label>
                    ) : (
                        <LenkeBase
                            href={parentPath}
                            className={classNames(style.item)}
                        >
                            <Label>{parentTitle}</Label>
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
                                <Label className={classNames(style.item, style.active)}>
                                    {chapter.displayName}
                                </Label>
                            ) : (
                                <LenkeBase
                                    href={chapterPath}
                                    className={classNames(style.item)}
                                >
                                    <Label>{chapter.displayName}</Label>
                                </LenkeBase>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
