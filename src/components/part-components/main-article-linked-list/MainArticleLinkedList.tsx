import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { ContentType } from 'types/content-types/_schema';
import { enonicPathToAppPath } from 'utils/paths';
import { MainArticleChapterProps } from 'types/content-types/main-article-chapter-props';
import { BEM } from 'utils/bem';
import './MainArticleLinkedList.less';

export type MainArticleLinkedListProps =
    | (RegionProps & MainArticleProps)
    | (RegionProps & MainArticleChapterProps);

export const MainArticleLinkedList = (props: MainArticleLinkedListProps) => {
    const bem = BEM('main-article-linked-list');

    const children = props.children || props.parent?.children || [];
    const chapters = children.filter(
        (child) => child.__typename === ContentType.MainArticleChapter
    );

    if (chapters.length === 0) {
        return null;
    }

    const currentPath = enonicPathToAppPath(props._path);
    const parentPath = enonicPathToAppPath(props.parent?._path || props._path);
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
                    const chapterPath = enonicPathToAppPath(chapter._path);
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
