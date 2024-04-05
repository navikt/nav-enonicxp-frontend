import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste, ListType } from 'components/_common/lenkeliste/Lenkeliste';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { getUrlFromContent } from 'utils/links-from-content';
import { DateTimeKey } from 'types/datetime';
import { ContentProps } from 'types/content-props/_content-common';
import { getNestedValueFromKeyString } from 'utils/objects';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

const getDate = (content: ContentProps, dateLabelKey?: DateTimeKey): string => {
    const dateLabel = dateLabelKey && getNestedValueFromKeyString(content, dateLabelKey);
    return typeof dateLabel === 'string' ? dateLabel : getPublishedDateTime(content);
};

type Props = {
    content: ContentListProps;
    title?: string;
    hideTitle?: boolean;
    showDateLabel?: boolean;
    listType: ListType;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    hideTitle,
    showDateLabel,
    listType,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return <EditorHelp text={'Tom lenkeliste'} />;
    }

    const { sectionContents, sortedBy } = content.data;

    const lenkeData = sectionContents.reduce<LinkProps[]>((acc, scContent) => {
        const url = getUrlFromContent(scContent);
        const text = scContent.data?.title || scContent.displayName;

        if (url && text) {
            acc.push({
                url,
                text,
                label: showDateLabel
                    ? formatDate({
                          datetime: getDate(scContent, sortedBy),
                          short: true,
                          year: true,
                      })
                    : undefined,
            });
        }

        return acc;
    }, []);

    return (
        <Lenkeliste
            lenker={lenkeData}
            tittel={hideTitle ? undefined : title || content.displayName}
            listType={listType}
            className={className}
        />
    );
};
