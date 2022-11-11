import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { translator } from 'translations';
import { CurrentTopicPageProps } from '../../../../types/content-props/dynamic-page-props';
import { DateLine } from './DateLine';

import style from './FeaturedHeader.module.scss';
import { Heading } from '@navikt/ds-react';
import { TagLine } from './TagLine';

type Props = {
    showTimeStamp?: boolean;
    contentProps: CurrentTopicPageProps;
};

export const NewsHeader = ({ contentProps }: Props) => {
    const { displayName, createdTime, modifiedTime, data } = contentProps;
    const { language } = usePageConfig();

    const getFeaturedTranslations = translator('currentTopic', language);

    const { title } = data;

    const tagLineLabel = getFeaturedTranslations('tag');

    const pageTitle = title || displayName;

    return (
        <>
            <TagLine>{tagLineLabel}</TagLine>
            <header className={classNames(style.featuredHeader)}>
                <Heading className={style.header} level={'1'} size={'xlarge'}>
                    {pageTitle}
                </Heading>
            </header>
            <DateLine
                createdTime={createdTime}
                modifiedTime={modifiedTime}
                language={language}
            />
        </>
    );
};
