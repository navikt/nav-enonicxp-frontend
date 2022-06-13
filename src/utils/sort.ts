import { CustomContentProps } from '../types/content-props/_content-common';

const getLastUpdatedUnixTime = (content: CustomContentProps) =>
    new Date(
        content.modifiedTime.split('.')[0] || content.createdTime.split('.')[0]
    ).getTime();

export const sortContentByLastModified = (
    a: CustomContentProps,
    b: CustomContentProps
) => getLastUpdatedUnixTime(b) - getLastUpdatedUnixTime(a);
