import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { BEM } from 'utils/classnames';
import { MainArticleChapterProps } from '../../../types/content-props/main-article-chapter-props';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import './MainArticleChapterNavigation.less';

/*
    Render of XP part named main-article-linked-list
*/

export const MainArticleChapterNavigation = (props: ContentProps) => {
    const bem = BEM('main-article-chapter-navigation');
    const chapters =
        props.data?.chapters ||
        props.parent?.data?.chapters ||
        // TODO: remove after backend chapters-update
        ((props.children || props.parent?.children)?.filter(
            (child) => child.__typename === ContentType.MainArticleChapter
        ) as MainArticleChapterProps[]) ||
        [];

    if (chapters.length === 0) {
        return null;
    }

    const currentPath = stripXpPathPrefix(props._path);
    const parentPath = stripXpPathPrefix(props.parent?._path || props._path);
    const parentTitle = props.parent?.displayName || props.displayName;
    const parentSelected = parentPath === currentPath;

    return (
        <nav className={bem()}>
            <ul>
                <li>
                    {parentSelected ? (
                        <Normaltekst>{parentTitle}</Normaltekst>
                    ) : (
                        <LenkeBase href={parentPath} className={'lenke'}>
                            {parentTitle}
                        </LenkeBase>
                    )}
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = stripXpPathPrefix(chapter._path);
                    const chapterSelected = currentPath === chapterPath;
                    return (
                        <li key={chapter._path}>
                            {chapterSelected ? (
                                <Normaltekst>{chapter.displayName}</Normaltekst>
                            ) : (
                                <LenkeBase
                                    href={chapterPath}
                                    className={'lenke'}
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
