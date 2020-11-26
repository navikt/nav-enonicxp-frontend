import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { sortContentByLastModified } from 'utils/sort';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from '../../../utils/url-from-content';

type Props = {
    content: ContentListProps;
    title?: string;
    showDateLabel?: boolean;
    sorted?: boolean;
    maxItems?: number;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    showDateLabel = false,
    sorted = false,
    maxItems = 128,
    className,
}: Props) => {
    const lenkeData: LinkProps[] = content.data.sectionContents
        .sort(sorted ? sortContentByLastModified : undefined)
        .slice(0, maxItems)
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: showDateLabel
                ? formatDate(scContent.modifiedTime || scContent.createdTime)
                : undefined,
        }))
        .filter(({ url, text }) => url && text);

    return lenkeData.length > 0 ? (
        <Lenkeliste
            lenker={lenkeData}
            tittel={title || content?.displayName}
            className={className}
        />
    ) : null;
};
