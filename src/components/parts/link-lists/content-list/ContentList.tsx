import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LenkeData } from 'types/lenke-data';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { sortContentByLastModified } from 'utils/sort';
import { formatDate } from 'utils/datetime';
import {
    ContentType,
    ContentProps,
} from '../../../../types/content-props/_content-common';

type Props = {
    content: ContentListProps;
    showDateLabel?: boolean;
    sorted?: boolean;
    maxItems?: number;
    className?: string;
};

const getUrl = (content: ContentProps) => {
    if (content.__typename === ContentType.InternalLink) {
        return content.data?.target?._path;
    }
    if (content.__typename === ContentType.ExternalLink) {
        return content.data?.url;
    }
    return content._path;
};

export const ContentList = ({
    content,
    showDateLabel = false,
    sorted = false,
    maxItems = 128,
    className,
}: Props) => {
    const lenkeData: LenkeData[] = content.data.sectionContents
        .sort(sorted ? sortContentByLastModified : undefined)
        .slice(0, maxItems)
        .map((scContent) => ({
            url: getUrl(scContent),
            lenketekst: scContent.displayName,
            label: showDateLabel
                ? formatDate(scContent.modifiedTime || scContent.createdTime)
                : undefined,
        }))
        .filter(({ url, lenketekst }) => url && lenketekst);

    return (
        <Lenkeliste
            lenker={lenkeData}
            tittel={content?.displayName}
            className={className}
        />
    );
};
