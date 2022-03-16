import React from 'react';
import { Heading, Label } from '@navikt/ds-react';
import { translator } from 'translations';

import classNames from 'classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { BEM } from 'utils/classnames';
import { MainArticleChapterNavigationData } from '../../../../types/content-props/main-article-chapter-props';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

const bem = BEM('main-article-chapter-navigation');

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
        <nav className={bem()}>
            <Heading level="2" size="medium" className={bem('title')}>
                {getLabel('contents')}
            </Heading>
            <ul>
                <li>
                    {parentSelected ? (
                        <Label
                            className={classNames(
                                bem('item'),
                                bem('item', 'active')
                            )}
                        >
                            {parentTitle}
                        </Label>
                    ) : (
                        <LenkeBase
                            href={parentPath}
                            className={classNames(bem('item'))}
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
                                <Label
                                    className={classNames(
                                        bem('item'),
                                        bem('item', 'active')
                                    )}
                                >
                                    {chapter.displayName}
                                </Label>
                            ) : (
                                <LenkeBase
                                    href={chapterPath}
                                    className={classNames(bem('item'))}
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
