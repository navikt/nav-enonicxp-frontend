// @ts-nocheck
// Refactor the layout types before fixing the type errors in this file
import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutComponentProps, LayoutType } from 'types/component-props/layouts';
import { TwoColsPage } from 'components/layouts/two-cols-page/TwoColsPage';
import { ComponentEditorProps } from 'components/ComponentMapper';
import { FixedColsLayout } from './fixed-cols/FixedColsLayout';
import { FlexColsLayout } from './flex-cols/FlexColsLayout';
import { LegacyLayout } from './legacy/LegacyLayout';
import { PageWithSideMenus } from './page-with-side-menus/PageWithSideMenus';
import { SectionWithHeaderLayout } from './section-with-header/SectionWithHeaderLayout';
import { SingleColPage } from './single-col-page/SingleColPage';
import { SituationPageFlexColsLayout } from './flex-cols/SituationPageFlexColsLayout';
import { ProductPageFlexColsLayout } from './flex-cols/ProductPageFlexColsLayout';
import { ProductDetailsLayout } from './product-details-layout/ProductDetailsLayout';
import { IndexPage } from './index-page/IndexPage';
import { useLayoutConfig } from './useLayoutConfig';
import { AreapageSituationsLayout } from './areapage-situations/AreapageSituationsLayout';
import { InnloggetSeksjonForsideLayout } from './innlogget-seksjon-forside/InnloggetSeksjonForsideLayout';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutComponentProps;
    editorProps?: ComponentEditorProps;
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
    [LayoutType.FlexCols]: FlexColsLayout,
    [LayoutType.SectionWithHeader]: SectionWithHeaderLayout,
    [LayoutType.PageWithSideMenus]: PageWithSideMenus,
    [LayoutType.SingleColPage]: SingleColPage,
    [LayoutType.SituationPageFlexCols]: SituationPageFlexColsLayout,
    [LayoutType.ProductPageFlexCols]: ProductPageFlexColsLayout,
    [LayoutType.ProductDetailsPage]: ProductDetailsLayout,
    [LayoutType.IndexPage]: IndexPage,
    [LayoutType.AreapageSituations]: AreapageSituationsLayout,
    [LayoutType.InnloggetSeksjonForside]: InnloggetSeksjonForsideLayout,
    [LayoutType.TwoColsPage]: TwoColsPage,
};

export const LayoutMapper = ({ pageProps, layoutProps, editorProps }: Props) => {
    const { config, descriptor, regions } = layoutProps;

    const { LayoutConfigProvider } = useLayoutConfig();

    if (!descriptor || !regions) {
        return editorProps ? <div {...editorProps} /> : null;
    }

    const LayoutComponent = layoutComponents[descriptor];

    if (!LayoutComponent) {
        return <div {...editorProps}>{`Unimplemented layout type: ${descriptor}`}</div>;
    }

    return (
        <LayoutConfigProvider
            value={{
                type: descriptor,
                title: config?.title,
                editorProps,
            }}
        >
            <LayoutComponent pageProps={pageProps} layoutProps={layoutProps} />
        </LayoutConfigProvider>
    );
};
