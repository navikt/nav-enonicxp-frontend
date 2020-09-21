import { ContentTypeSchema } from '../types/content-types/_schema';

const getLastUpdatedUnixTime = (content: ContentTypeSchema) =>
    new Date(
        content.modifiedTime.split('.')[0] || content.createdTime.split('.')[0]
    ).getTime();

export const sortContentByLastModified = (
    a: ContentTypeSchema,
    b: ContentTypeSchema
) => getLastUpdatedUnixTime(b) - getLastUpdatedUnixTime(a);
