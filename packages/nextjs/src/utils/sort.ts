import { ContentProps } from 'types/content-props/_content-common';

const getLastUpdatedUnixTime = (content: ContentProps) =>
    new Date(content.modifiedTime.split('.')[0] ?? content.createdTime.split('.')[0]).getTime();

export const sortContentByLastModified = (a: ContentProps, b: ContentProps) =>
    getLastUpdatedUnixTime(b) - getLastUpdatedUnixTime(a);
