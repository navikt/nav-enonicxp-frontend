import React from 'react';
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
                    <LenkeInline
                        href={parentPath}
                        className={parentSelected ? `selected` : ``}
                    >
                        <span>{parentTitle}</span>
                    </LenkeInline>
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = xpPathToAppPath(chapter._path);
                    const chapterSelected = currentPath === chapterPath;
                    return (
                        <li key={chapter._path}>
                            <LenkeInline
                                href={chapterPath}
                                className={chapterSelected ? `selected` : ``}
                            >
                                <span>{chapter.displayName}</span>
                            </LenkeInline>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
