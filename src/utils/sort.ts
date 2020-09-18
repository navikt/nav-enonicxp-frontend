import { ContentTypeSchemas } from '../types/schemas/_schemas';

const getLastUpdatedUnixTime = (content: ContentTypeSchemas) =>
    new Date(
        content.modifiedTime.split('.')[0] || content.createdTime.split('.')[0]
    ).getTime();

export const sortContentByLastModified = (
    a: ContentTypeSchemas,
    b: ContentTypeSchemas
) => getLastUpdatedUnixTime(b) - getLastUpdatedUnixTime(a);
