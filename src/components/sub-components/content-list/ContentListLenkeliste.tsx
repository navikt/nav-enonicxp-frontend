import React from 'react';
import { ContentListSchema } from '../../../types/schemas/content-list-schema';
import { LenkeData } from '../../../types/lenkedata';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { sortContentByLastModified } from '../../../utils/sort';

type Props = {
    content: ContentListSchema;
    showDateLabel?: boolean;
    sorted?: boolean;
    maxItems?: number;
    className?: string;
};

export const ContentListLenkeliste = ({
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
