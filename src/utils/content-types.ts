import { ContentType } from 'types/content-props/_content-common';

const legacyContentTypes: ReadonlySet<ContentType> = new Set([
    ContentType.LargeTable,
    ContentType.MainArticle,
    ContentType.MainArticleChapter,
    ContentType.Melding,
    ContentType.OfficeInformation,
    ContentType.PageList,
    ContentType.PublishingCalendar,
    ContentType.SectionPage,
    ContentType.TransportPage,
]);

export const isLegacyContentType = (type: ContentType) => legacyContentTypes.has(type);
