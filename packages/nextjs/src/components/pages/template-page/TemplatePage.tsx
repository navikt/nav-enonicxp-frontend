import React from 'react';
import { DynamicPage } from 'components/pages/dynamic-page/DynamicPage';
import { ContentType } from 'types/content-props/_content-common';
import { TemplateProps } from 'types/content-props/template-props';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';

const legacyMockData = {
    ...linkListDataMock,
    ...linkPanelsDataMock,
    ...mainArticleDataMock,
    ...mainPanelDataMock,
};

const legacyTemplateTypes: ReadonlySet<ContentType> = new Set([
    ContentType.MainArticle,
    ContentType.MainArticleChapter,
    ContentType.OfficeInformation,
    ContentType.SectionPage,
    ContentType.PageList,
    ContentType.TransportPage,
    ContentType.Melding,
    ContentType.PublishingCalendar,
]);

export const TemplatePage = (props: TemplateProps) => {
    const templateSupportsType = props.data.supports?.[0];

    if (!templateSupportsType) {
        return <EditorHelp text={'Template må støtte minst en innholdstype'} />;
    }

    if (legacyTemplateTypes.has(templateSupportsType)) {
        const propsWithMocks = {
            ...props,
            data: { ...legacyMockData, ...props?.data },
        };

        return <DynamicPage {...propsWithMocks} />;
    }

    return <DynamicPage {...props} />;
};
