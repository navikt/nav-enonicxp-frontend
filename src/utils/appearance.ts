import { ContentProps, ContentType } from 'types/content-props/_content-common';

const contentTypeWithWhiteBackground = [
    ContentType.CurrentTopicPage,
    ContentType.MainArticle,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
];

export const hasWhiteBackground = (content: ContentProps) => {
    if (content.type === ContentType.MainArticle) {
        return content.data.contentType !== 'lastingContent';
    }

    return contentTypeWithWhiteBackground.includes(content.type);
};
