import React from 'react';
import { ContentListProps } from '../../../types/content-types/content-list-props';
import { LenkeData } from '../../../types/lenke-data';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { sortContentByLastModified } from '../../../utils/sort';

type Props = {
    content: ContentListProps;
    showDateLabel?: boolean;
    sorted?: boolean;
    maxItems?: number;
    className?: string;
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
        .map((data) => ({
            url: data._path,
            lenketekst: data.displayName,
            label: showDateLabel
                ? data.modifiedTime || data.createdTime
                : undefined,
            enonicId: data._id,
        }));

    return (
        <Lenkeliste
            lenker={lenkeData}
            tittel={content?.displayName}
            className={className}
        />
    );
};
