import React from 'react';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';
import { officeInformationMock } from './mocks/officeInformationMock';
import { ContentProps } from '../../../types/content-props/_content-common';
import ErrorPage404 from '../../../pages/404';

const legacyMockData = {
    ...linkListDataMock,
    ...linkPanelsDataMock,
    ...mainArticleDataMock,
    ...mainPanelDataMock,
    ...officeInformationMock,
};

export const TemplatePage = (props: ContentProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const propsWithMocks = {
        ...props,
        data: { ...legacyMockData, ...props?.data },
    };
    return <DynamicPage {...propsWithMocks} />;
};
