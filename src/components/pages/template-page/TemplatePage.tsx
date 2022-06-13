import React from 'react';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';
import { officeInformationMock } from './mocks/officeInformationMock';
import {
    ContentType,
    CustomContentProps,
} from '../../../types/content-props/_content-common';
import ErrorPage404 from '../../../pages/404';

const legacyMockData = {
    ...linkListDataMock,
    ...linkPanelsDataMock,
    ...mainArticleDataMock,
    ...mainPanelDataMock,
    ...officeInformationMock,
};

const legacyTemplateTypes = {
    [ContentType.MainArticle]: true,
    [ContentType.MainArticleChapter]: true,
    [ContentType.OfficeInformation]: true,
    [ContentType.SectionPage]: true,
    [ContentType.PageList]: true,
    [ContentType.TransportPage]: true,
    [ContentType.Melding]: true,
    [ContentType.PublishingCalendar]: true,
};

export const TemplatePage = (props: CustomContentProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    if (legacyTemplateTypes[props.__typename]) {
        const propsWithMocks = {
            ...props,
            data: { ...legacyMockData, ...props?.data },
        };

        // @ts-ignore (templates for these old types will never ever be changed, cba to type properly :D)
        return <DynamicPage {...propsWithMocks} />;
    }

    return <DynamicPage {...props} />;
};
