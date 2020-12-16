import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from '../../../utils/links-from-content';

type Props = {
    content: ContentListProps;
    title?: string;
    showDateLabel?: boolean;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    showDateLabel = false,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return null;
    }

    const lenkeData: LinkProps[] = content.data.sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: showDateLabel
                ? formatDate(scContent.publish?.first || scContent.createdTime)
                : undefined,
        }))
        .filter(({ url, text }) => url && text);

    return lenkeData?.length > 0 ? (
        <Lenkeliste
            lenker={lenkeData}
            tittel={title || content.displayName}
            className={className}
        />
    ) : null;
};
