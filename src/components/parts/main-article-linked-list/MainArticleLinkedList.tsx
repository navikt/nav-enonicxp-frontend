import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { xpPathToAppPath } from 'utils/paths';
import { BEM } from 'utils/bem';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './MainArticleLinkedList.less';

export const MainArticleLinkedList = (props: ContentProps) => {
    const bem = BEM('main-article-linked-list');

    const children = props.children || props.parent?.children || [];
    const chapters = children.filter(
        (child) => child.__typename === ContentType.MainArticleChapter
    );

    if (chapters.length === 0) {
        return null;
    }

    const currentPath = xpPathToAppPath(props._path);
    const parentPath = xpPathToAppPath(props.parent?._path || props._path);
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
                    const chapterPath = xpPathToAppPath(chapter._path);
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
