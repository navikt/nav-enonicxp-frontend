import React from 'react';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';
import { officeInformationMock } from './mocks/officeInformationMock';
import { ContentType } from 'types/content-props/_content-common';
import ErrorPage404 from '../../../pages/404';
import { TemplateProps } from 'types/content-props/template-props';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

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

export const TemplatePage = (props: TemplateProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const templateSupportsType = props.data.supports?.[0];

    if (!templateSupportsType) {
        return <EditorHelp text={'Template må støtte minst en innholdstype'} />;
    }

    if (legacyTemplateTypes[templateSupportsType]) {
        const propsWithMocks = {
            ...props,
            data: { ...legacyMockData, ...props?.data },
        };

        console.log(propsWithMocks);
        // @ts-ignore (templates for these old types will never ever be changed)
        return <DynamicPage {...propsWithMocks} />;
    }

    return <DynamicPage {...props} />;
};
