import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { RedirectPage } from '../redirect-page/RedirectPage';
import { DynamicPage } from '../dynamic-page/DynamicPage';

export const MainArticleChapterPage = (props: ContentProps) => {
    if (props.__typename !== ContentType.MainArticle) {
        return <RedirectPage {...props} />;
    }

    return <DynamicPage {...props} />;
};
