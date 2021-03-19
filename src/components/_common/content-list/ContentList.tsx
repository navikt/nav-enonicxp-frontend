import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from 'utils/links-from-content';
import { DateTimeContentKey } from 'types/datetime';
import { ContentProps } from 'types/content-props/_content-common';
import { getNestedValueFromKeyString } from 'utils/objects';

const getDate = (content: ContentProps, dateLabelKey: DateTimeContentKey) =>
    getNestedValueFromKeyString(content, dateLabelKey) ||
    content.modifiedTime ||
    content.createdTime;

type Props = {
    content: ContentListProps;
    title?: string;
    showDateLabel?: boolean;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    showDateLabel,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return null;
    }

    const { sectionContents, dateLabelKey } = content.data;

    const lenkeData: LinkProps[] = sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: showDateLabel
                ? formatDate(getDate(scContent, dateLabelKey))
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
