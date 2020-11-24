import React from 'react';
import { GlobalPageProps } from 'types/content-props/_content-common';
import {
    LayoutComponentProps,
    LayoutType,
} from '../../types/component-props/layouts';
import { ColumnsLayout } from './columns/ColumnsLayout';
import { MainPageLayout } from './main-page/MainPageLayout';
import { MainLayout } from './main/MainLayout';
import './Layouts.less';

const layoutComponents: { [key in LayoutType] } = {
    [LayoutType.Dynamic2Col]: ColumnsLayout,
    [LayoutType.Dynamic3Col]: ColumnsLayout,
    [LayoutType.Dynamic4Col]: ColumnsLayout,
    [LayoutType.Main]: MainLayout,
    [LayoutType.Main1Col]: ColumnsLayout,
    [LayoutType.MainPage]: MainPageLayout,
};

export type LayoutProps = {
    pageProps: GlobalPageProps;
    layoutProps?: LayoutComponentProps;
};

export const LayoutsMapper = (props: LayoutProps) => {
    const layoutType = props.layoutProps?.descriptor;
    const LayoutComponent = layoutComponents[layoutType];

    return LayoutComponent ? (
        <LayoutComponent {...props} />
    ) : (
        <div>{`Unimplemented layout type: ${layoutType}`}</div>
    );
};

export default LayoutsMapper;
