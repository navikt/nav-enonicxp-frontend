import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { getPublishedDateTime } from 'utils/datetime';
import { translator } from 'translations';
import { CurrentTopicPageProps } from 'types/content-props/dynamic-page-props';
import { DateLine } from './DateLine';
import { TagLine } from './TagLine';

import style from './FeaturedHeader.module.scss';

type Props = {
    showTimeStamp?: boolean;
    contentProps: CurrentTopicPageProps;
};

export const FeaturedHeader = ({ contentProps }: Props) => {
    const { displayName, modifiedTime, data } = contentProps;
    const { language } = usePageContentProps();
    const pageTitle = data.title || displayName;

    const publishedTime = getPublishedDateTime(contentProps);
    const getFeaturedTranslations = translator('currentTopic', language);

    const tagLineLabel = getFeaturedTranslations('tag');

    return (
        <>
            <TagLine>{tagLineLabel}</TagLine>
            <header className={classNames(style.featuredHeader)}>
                <Heading className={style.header} level={'1'} size={'xlarge'}>
                    {pageTitle}
                </Heading>
            </header>
            <DateLine contentProps={contentProps} />
        </>
    );
};
