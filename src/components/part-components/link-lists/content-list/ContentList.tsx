import React from 'react';
import { ContentListProps } from 'types/content-types/content-list-props';
import { LenkeData } from 'types/lenke-data';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { sortContentByLastModified } from 'utils/sort';
import { formatDate } from 'utils/datetime';
import {
    ContentType,
    ContentTypeSchema,
} from '../../../../types/content-types/_schema';

type Props = {
    content: ContentListProps;
    showDateLabel?: boolean;
    sorted?: boolean;
    maxItems?: number;
    className?: string;
};

const getUrl = (content: ContentTypeSchema) => {
    if (content.__typename === ContentType.InternalLink) {
        return content.data.target._path;
    }
    if (content.__typename === ContentType.ExternalLink) {
        return content.data.url;
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
            xpId: scContent._id,
        }));

    return (
        <Lenkeliste
            lenker={lenkeData}
            tittel={content?.displayName}
            className={className}
        />
    );
};
