import React from 'react';
import { BodyShort, Label, Title } from '@navikt/ds-react';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { BEM } from 'utils/classnames';
import { MainArticleChapterProps } from '../../../../types/content-props/main-article-chapter-props';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import './MainArticleChapterNavigation.less';
import classNames from 'classnames';

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
            <Title level={3} size="m" className={bem('title')}>
                Innhold
            </Title>
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
                    const chapterPath = stripXpPathPrefix(chapter._path);
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
