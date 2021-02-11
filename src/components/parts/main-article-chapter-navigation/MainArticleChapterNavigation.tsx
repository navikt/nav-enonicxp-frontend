import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { xpPathToPathname } from 'utils/paths';
import { BEM } from 'utils/classnames';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './MainArticleChapterNavigation.less';

/*
    Render of XP part named main-article-linked-list
*/

export const MainArticleChapterNavigation = (props: ContentProps) => {
    const bem = BEM('main-article-chapter-navigation');
    const children = props.children || props.parent?.children || [];
    const chapters = children.filter(
        (child) => child.__typename === ContentType.MainArticleChapter
    );

    if (chapters.length === 0) {
        return null;
    }

    const currentPath = xpPathToPathname(props._path);
    const parentPath = xpPathToPathname(props.parent?._path || props._path);
    const parentTitle = props.parent?.displayName || props.displayName;
    const parentSelected = parentPath === currentPath;

    return (
        <nav className={bem()}>
            <ul>
                <li>
                    {parentSelected ? (
                        <Normaltekst>{parentTitle}</Normaltekst>
                    ) : (
                        <LenkeInline href={parentPath}>
                            {parentTitle}
                        </LenkeInline>
                    )}
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = xpPathToPathname(chapter._path);
                    const chapterSelected = currentPath === chapterPath;
                    return (
                        <li key={chapter._path}>
                            {chapterSelected ? (
                                <Normaltekst>{chapter.displayName}</Normaltekst>
                            ) : (
                                <LenkeInline href={chapterPath}>
                                    {chapter.displayName}
                                </LenkeInline>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
