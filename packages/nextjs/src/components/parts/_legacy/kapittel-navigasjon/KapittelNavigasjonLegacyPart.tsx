import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { ContentType, ContentProps } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from 'utils/urls';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { usePageContentProps } from 'store/pageContext';
import { KapittelNavigasjonData } from 'types/content-props/kapittel-props';

import style from './KapittelNavigasjon.module.scss';

// If the chapter points to any content other than a artikkel, we want
// to link directly to the content instead, rather than try to render it
// as a chapter
const getChapterPath = (chapter: KapittelNavigasjonData) =>
    !chapter.data?.article || chapter.data.article.type === ContentType.Artikkel
        ? chapter._path
        : chapter.data.article._path;

const getChapters = (contentProps: ContentProps) => {
    if (contentProps.type === ContentType.Artikkel) {
        return contentProps.data?.chapters;
    }

    if (contentProps.type === ContentType.Kapittel) {
        return contentProps.parent?.data?.chapters;
    }

    return null;
};

export const KapittelNavigasjonLegacyPart = (props: ContentProps) => {
    const { language } = usePageContentProps();
    const chapters = getChapters(props);
    if (!chapters || chapters.length === 0) {
        return null;
    }
    const getLabel = translator('mainArticle', language);
    const currentPath = stripXpPathPrefix(props._path);
    const parentPath = stripXpPathPrefix(props.parent?._path || props._path);
    const parentTitle = props.parent?.displayName || props.displayName;
    const parentSelected = parentPath === currentPath;
    const headingId = `heading-chapter-navigation`;

    return (
        <nav className={style.kapittelNavigasjon} aria-labelledby={headingId}>
            <Heading id={headingId} level="2" size="medium" className={style.title}>
                {getLabel('contents')}
            </Heading>
            <ul>
                <li>
                    {parentSelected ? (
                        <BodyLong className={classNames(style.item, style.active)}>
                            {parentTitle}
                        </BodyLong>
                    ) : (
                        <LenkeBase href={parentPath} className={style.item}>
                            {parentTitle}
                        </LenkeBase>
                    )}
                </li>
                {chapters.map((chapter) => {
                    const chapterPath = stripXpPathPrefix(getChapterPath(chapter));
                    const chapterSelected = currentPath === chapterPath;

                    return (
                        <li key={chapter._path}>
                            {chapterSelected ? (
                                <BodyLong className={classNames(style.item, style.active)}>
                                    {chapter.displayName}
                                </BodyLong>
                            ) : (
                                <LenkeBase href={chapterPath} className={style.item}>
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
