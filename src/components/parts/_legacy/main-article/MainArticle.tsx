import React from 'react';
import { ContentType } from 'types/content-props/_content-common';
import { MainArticleProps } from 'types/content-props/main-article-props';
import { MainArticleChapterProps } from 'types/content-props/main-article-chapter-props';
import { MainArticleNewsPress } from './MainArticleNewsPress';
import { MainArticlePermanent } from './MainArticlePermanent';

type Props = MainArticleProps | MainArticleChapterProps;

// Get props from the chapter article if the content is a chapter
const getPropsToRender = (propsInitial: Props) =>
    propsInitial.type === ContentType.MainArticleChapter
        ? propsInitial.data.article
        : propsInitial;

export const MainArticle = (propsInitial: Props) => {
    const props = getPropsToRender(propsInitial);

    const Component =
        props.data.contentType === 'news' ||
        props.data.contentType === 'pressRelease'
            ? MainArticleNewsPress
            : MainArticlePermanent;

    return <Component {...props} />;
};
