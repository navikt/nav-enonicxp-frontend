import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { CurrentTopicPageProps } from 'components/pages/current-topic-page/CurrentTopicPage';
import { ContentProps } from 'types/content-props/_content-common';
import { DateLine } from './DateLine/DateLine';
import { TagLine } from './TagLine/TagLine';

import style from './FeaturedHeader.module.scss';

type Props = {
    showTimeStamp?: boolean;
    contentProps: Pick<CurrentTopicPageProps, 'displayName' | 'data'> &
        Pick<ContentProps, 'publish' | 'modifiedTime' | 'createdTime'>; //TODO gjenbruk del av GetPublishedAndModifiedStringProps?
};

export const FeaturedHeader = ({ contentProps }: Props) => {
    const { displayName, data, publish, modifiedTime, createdTime } = contentProps;
    const { language } = usePageContentProps();
    const pageTitle = data.title || displayName;

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
            <DateLine content={{ publish, modifiedTime, createdTime, language }} />
        </>
    );
};
