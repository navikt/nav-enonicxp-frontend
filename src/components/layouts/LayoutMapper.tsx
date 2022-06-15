import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedColsLayout } from './fixed-cols/FixedColsLayout';
import { FlexColsLayout } from './flex-cols/FlexColsLayout';
import { LegacyLayout } from './legacy/LegacyLayout';
import { PageWithSideMenus } from './page-with-side-menus/PageWithSideMenus';
import { SectionWithHeaderLayout } from './section-with-header/SectionWithHeaderLayout';
import { ComponentType } from '../../types/component-props/_component-common';
import { SingleColPage } from './single-col-page/SingleColPage';
import { SituationPageFlexColsLayout } from './flex-cols/SituationPageFlexColsLayout';
import { ProductPageFlexColsLayout } from './flex-cols/ProductPageFlexColsLayout';
import { ProductDetailsLayout } from './product-details-layout/ProductDetailsLayout';
import { Provider } from 'react-redux';
import { createNewStore } from 'store/store';
import { setLayoutConfigAction } from 'store/slices/layoutConfig';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

const layoutComponents: {
    [key in LayoutType]: React.FunctionComponent<Props>;
} = {
    [LayoutType.LegacyMain]: LegacyLayout,
    [LayoutType.LegacyMain1Col]: LegacyLayout,
    [LayoutType.MainPage]: LegacyLayout,
    [LayoutType.Fixed1Col]: FixedColsLayout,
    [LayoutType.Fixed2Col]: FixedColsLayout,
    [LayoutType.Fixed3Col]: FixedColsLayout,
    [LayoutType.Fixed4Col]: FixedColsLayout,
    [LayoutType.FlexCols]: FlexColsLayout,
    [LayoutType.SectionWithHeader]: SectionWithHeaderLayout,
    [LayoutType.PageWithSideMenus]: PageWithSideMenus,
    [LayoutType.SingleColPage]: SingleColPage,
    [LayoutType.SituationPageFlexCols]: SituationPageFlexColsLayout,
    [LayoutType.ProductPageFlexCols]: ProductPageFlexColsLayout,
    [LayoutType.ProductDetailsPage]: ProductDetailsLayout,
};

export const LayoutMapper = ({ pageProps, layoutProps }: Props) => {
    const { config, descriptor, path, regions } = layoutProps;
    const isEditView = pageProps.editorView === 'edit';

    const editorProps = {
        'data-portal-component-type': ComponentType.Layout,
        'data-portal-component': path,
    };

    if (!descriptor || !regions) {
        return isEditView ? <div {...editorProps} /> : null;
    }

    const LayoutComponent = layoutComponents[descriptor];

    if (!LayoutComponent) {
        return (
            <div
                {...editorProps}
            >{`Unimplemented layout type: ${descriptor}`}</div>
        );
    }

    const store = createNewStore();
    store.dispatch(
        setLayoutConfigAction({
            type: descriptor,
            title: (config && config.title) && config.title,
        })
    );

    return (
        <Provider store={store}>
            <LayoutComponent pageProps={pageProps} layoutProps={layoutProps} />
        </Provider>
    );
};
