import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from 'utils/links-from-content';
import { DateTimeKey } from 'types/datetime';
import { ContentProps } from 'types/content-props/_content-common';
import { getNestedValueFromKeyString } from 'utils/objects';

const getDate = (content: ContentProps, dateLabelKey: DateTimeKey) =>
    getNestedValueFromKeyString(content, dateLabelKey) ||
    content.publish?.from ||
    content.publish?.first ||
    content.createdTime;

type Props = {
    content: ContentListProps;
    title?: string;
    showDateLabel?: boolean;
    chevron?: boolean;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    showDateLabel,
    chevron,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return null;
    }

    const { sectionContents, sortedBy } = content.data;

    const lenkeData: LinkProps[] = sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: showDateLabel
                ? formatDate(getDate(scContent, sortedBy))
                : undefined,
        }))
        .filter(({ url, text }) => url && text);

    return lenkeData?.length > 0 ? (
        <Lenkeliste
            lenker={lenkeData}
            tittel={title || content.displayName}
            chevron={chevron}
            className={className}
        />
    ) : null;
};
