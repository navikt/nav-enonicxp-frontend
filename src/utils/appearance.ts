import { ContentProps, ContentType } from 'types/content-props/_content-common';

import { getContentLanguages } from './languages';

const contentTypeWithWhiteBackground: ReadonlySet<ContentType> = new Set([
    ContentType.CurrentTopicPage,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
    ContentType.MainArticle,
]);

const contentTypesWithWhiteHeader: ReadonlySet<ContentType> = new Set([
    ContentType.AreaPage,
    ContentType.CurrentTopicPage,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
    ContentType.FrontPage,
    ContentType.FrontPageNested,
    ContentType.GenericPage,
    ContentType.GuidePage,
    ContentType.OfficeBranchPage,
    ContentType.OfficeEditorialPage,
    ContentType.Overview,
    ContentType.PressLandingPage,
    ContentType.ProductPage,
    ContentType.SituationPage,
    ContentType.ThemedArticlePage,
]);

export const hasWhitePage = (content: ContentProps) => {
    const { type } = content;

    if (type === ContentType.MainArticle) {
        const contentType = content.data?.contentType;
        return contentType === 'news' || contentType === 'pressRelease';
    }

    return contentTypeWithWhiteBackground.has(content.type);
};

export const hasWhiteHeader = (content: ContentProps) => {
    const { type } = content;

    if (hasWhitePage(content)) {
        return true;
    }

    return contentTypesWithWhiteHeader.has(type);
};

export const shouldPushUpwards = (content: ContentProps) => {
    const { breadcrumbs } = content;
    return (breadcrumbs && breadcrumbs.length > 0) || getContentLanguages(content).length > 0;
};
