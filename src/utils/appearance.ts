import { ContentProps, ContentType } from 'types/content-props/_content-common';

export const hasWhiteBackground = (content: ContentProps) => {
    const contentTypeWithWhiteBackground = [
        ContentType.CurrentTopicPage,
        ContentType.MainArticle,
    ];

    if (content.type === ContentType.MainArticle) {
        return content.data.contentType !== 'lastingContent';
    }
    return contentTypeWithWhiteBackground.includes(content.type);
};
