import { ContentTypeProps } from '../types/content-props/_content-common';

const getLastUpdatedUnixTime = (content: ContentTypeProps) =>
    new Date(
        content.modifiedTime.split('.')[0] || content.createdTime.split('.')[0]
    ).getTime();

export const sortContentByLastModified = (
    a: ContentTypeProps,
    b: ContentTypeProps
) => getLastUpdatedUnixTime(b) - getLastUpdatedUnixTime(a);
