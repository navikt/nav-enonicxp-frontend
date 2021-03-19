import React from 'react';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from '../../../utils/links-from-content';
import { DateTimeOption } from '../../../types/component-props/_mixins';
import { ContentProps } from '../../../types/content-props/_content-common';
import { ContentListProps } from '../../../types/content-props/content-list-props';

const getDate = (content: ContentProps, dateLabelOption: DateTimeOption) => {
    switch (dateLabelOption) {
        case 'createdTime':
            if (content.createdTime) {
                return content.createdTime;
            }
            break;
        case 'modifiedTime':
            if (content.modifiedTime) {
                return content.modifiedTime;
            }
            break;
        case 'publish.first':
            if (content.publish?.first) {
                return content.publish.first;
            }
            break;
        case 'publish.from':
            if (content.publish?.from) {
                return content.publish.from;
            }
            break;
    }

    return content.modifiedTime || content.createdTime;
};

type Props = {
    content: ContentListProps;
    title?: string;
    dateLabelOption?: DateTimeOption;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    dateLabelOption,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return null;
    }

    const lenkeData: LinkProps[] = content.data.sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.displayName,
            label: dateLabelOption
                ? formatDate(getDate(scContent, dateLabelOption))
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
