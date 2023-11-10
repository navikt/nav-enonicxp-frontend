import { getAudience } from 'types/component-props/_mixins';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

const contentTypeWithWhiteBackground = [
    ContentType.CurrentTopicPage,
    ContentType.MainArticle,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
];

const contentTypesWithWhiteHeader: ReadonlySet<ContentType> = new Set([
    ContentType.ProductPage,
    ContentType.SituationPage,
    ContentType.CurrentTopicPage,
    ContentType.GuidePage,
    ContentType.GenericPage,
    ContentType.ThemedArticlePage,
    ContentType.Overview,
    ContentType.OfficeEditorialPage,
    ContentType.OfficeBranchPage,
    ContentType.FrontPage,
    ContentType.FrontPageNested,
    ContentType.AreaPage,
    ContentType.PressLandingPage,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
]);

export const checkForNoGap = (content: ContentProps) => {
    if (
        content.type === ContentType.FrontPage &&
        (getAudience(content.data.audience) === 'employer' ||
            getAudience(content.data.audience) === 'provider')
    ) {
        return true;
    }
    if (
        content.type === ContentType.FrontPageNested &&
        getAudience(content.data.audience) === 'provider'
    ) {
        return true;
    }

    return false;
};

export const checkForWhiteHeader = (content: ContentProps) => {
    const { type } = content;

    if (type === ContentType.MainArticle) {
        const contentType = content.data?.contentType;
        return contentType === 'news' || contentType === 'pressRelease';
    }

    return contentTypesWithWhiteHeader.has(type);
};

export const hasWhiteBackground = (content: ContentProps) => {
    if (content.type === ContentType.MainArticle) {
        return content.data.contentType !== 'lastingContent';
    }

    return contentTypeWithWhiteBackground.includes(content.type);
};
