import React from 'react';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';
import { ContentProps } from '../../../types/content-props/_content-common';
import ErrorPage404 from '../../../pages/404';

const mockData = {
    ...linkListDataMock,
    ...linkPanelsDataMock,
    ...mainArticleDataMock,
    ...mainPanelDataMock,
};

export const TemplatePage = (props: ContentProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const propsWithMocks = { ...props, data: { ...mockData, ...props?.data } };
    return <DynamicPage {...propsWithMocks} />;
};
