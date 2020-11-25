import React from 'react';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { linkListDataMock } from './mocks/linkListDataMock';
import { linkPanelsDataMock } from './mocks/linkPanelsDataMock';
import { mainArticleDataMock } from './mocks/mainArticleDataMock';
import { mainPanelDataMock } from './mocks/mainPanelsDataMock';
import { ContentTypeProps } from '../../../types/content-props/_content-common';

const mockData = {
    ...linkListDataMock,
    ...linkPanelsDataMock,
    ...mainArticleDataMock,
    ...mainPanelDataMock,
};

export const TemplatePage = (props: ContentTypeProps) => {
    const propsWithMocks = { ...props, data: { ...props.data, ...mockData } };
    return <DynamicPage {...propsWithMocks} />;
};
