import React from 'react';
import { classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { NewsArticlePageProps } from '../../../../types/content-props/dynamic-page-props';
import { DateLine } from './DateLine';

import style from './NewsHeader.module.scss';

type Props = {
    showTimeStamp?: boolean;
    contentProps: NewsArticlePageProps;
};

export const NewsHeader = ({ contentProps }: Props) => {
    const { displayName, createdTime, modifiedTime, data } = contentProps;

    const { title } = data;

    const { language } = usePageConfig();

    const pageTitle = title || displayName;

    return (
        <div>
            <header className={classNames(style.themedPageHeader)}>
                <div className={style.text}>
                    <PageHeader justify={'left'}>{pageTitle}</PageHeader>
                </div>
            </header>
            <DateLine
                createdTime={createdTime}
                modifiedTime={modifiedTime}
                language={language}
            />
        </div>
    );
};
