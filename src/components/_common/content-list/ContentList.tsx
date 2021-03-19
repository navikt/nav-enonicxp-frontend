import React from 'react';
import { ContentListProps } from '../../../types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from '../../../utils/links-from-content';
import { DateTimeContentField } from '../../../types/datetime';
import { ContentProps } from '../../../types/content-props/_content-common';
import { getNestedValueFromKeyString } from '../../../utils/objects';

const getDate = (
    content: ContentProps,
    dateLabelOption: DateTimeContentField
) =>
    getNestedValueFromKeyString(content, dateLabelOption) ||
    content.modifiedTime ||
    content.createdTime;

type Props = {
    content: ContentListProps;
    title?: string;
    className?: string;
};

export const ContentList = ({ content, title, className }: Props) => {
    if (!content?.data?.sectionContents) {
        return null;
    }

    const { sectionContents, dateLabelKey } = content.data;

    const lenkeData: LinkProps[] = sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: dateLabelKey
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
