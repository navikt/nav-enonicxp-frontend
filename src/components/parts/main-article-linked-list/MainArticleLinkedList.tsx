import React from 'react';
import Lenke from 'nav-frontend-lenker';
import {
    ContentType,
    GlobalPageProps,
} from 'types/content-props/_content-common';
import { xpPathToAppPath } from 'utils/paths';
import { BEM } from 'utils/bem';
import './MainArticleLinkedList.less';

export const MainArticleLinkedList = (props: GlobalPageProps) => {
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
                    <Lenke
                        className={parentSelected ? `selected` : ``}
                        href={parentPath}
                    >
                        <span>{parentTitle}</span>
                    </Lenke>
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = xpPathToAppPath(chapter._path);
                    const chapterSelected = currentPath === chapterPath;
                    return (
                        <li key={chapter._path}>
                            <Lenke
                                href={chapterPath}
                                className={chapterSelected ? `selected` : ``}
                            >
                                <span>{chapter.displayName}</span>
                            </Lenke>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
