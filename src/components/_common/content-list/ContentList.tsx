import React from 'react';
import { ContentListProps } from 'types/content-props/content-list-props';
import { LinkProps } from 'types/link-props';
import { Lenkeliste } from '../lenkeliste/Lenkeliste';
import { formatDate } from 'utils/datetime';
import { getUrlFromContent } from 'utils/links-from-content';
import { DateTimeKey } from 'types/datetime';
import { ContentProps } from 'types/content-props/_content-common';
import { getNestedValueFromKeyString } from 'utils/objects';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

const getDate = (content: ContentProps, dateLabelKey: DateTimeKey) =>
    getNestedValueFromKeyString(content, dateLabelKey) ||
    content.publish?.from ||
    content.publish?.first ||
    content.createdTime;

type Props = {
    content: ContentListProps;
    title?: string;
    hideTitle?: boolean;
    showDateLabel?: boolean;
    withChevron?: boolean;
    className?: string;
};

export const ContentList = ({
    content,
    title,
    hideTitle,
    showDateLabel,
    withChevron,
    className,
}: Props) => {
    if (!content?.data?.sectionContents) {
        return <EditorHelp text={'Tom lenkeliste'} />;
    }

    const { sectionContents, sortedBy } = content.data;

    const lenkeData: LinkProps[] = sectionContents
        .map((scContent) => ({
            url: getUrlFromContent(scContent),
            text: scContent.data?.title || scContent.displayName,
            label: showDateLabel
                ? formatDate({
                      datetime: getDate(scContent, sortedBy),
                      short: true,
                      year: true,
                  })
                : undefined,
        }))
        .filter(({ url, text }) => url && text);

    return (
        <Lenkeliste
            lenker={lenkeData}
            tittel={!hideTitle && (title || content.displayName)}
            withChevron={withChevron}
            className={className}
        />
    );
};
