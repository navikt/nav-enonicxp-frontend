import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedColsLayout } from './fixed-cols/FixedColsLayout';
import { FlexColsLayout } from './flex-cols/FlexColsLayout';
import { LegacyLayout } from './legacy/LegacyLayout';
import { PageWithSideMenus } from './page-with-side-menus/PageWithSideMenus';
import { SectionWithHeaderLayout } from './section-with-header/SectionWithHeaderLayout';
import { SingleColPage } from './single-col-page/SingleColPage';
import { SituationPageFlexColsLayout } from './flex-cols/SituationPageFlexColsLayout';

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
};

export const LayoutMapper = ({ pageProps, layoutProps }: Props) => {
    const { descriptor } = layoutProps;

    const LayoutComponent = layoutComponents[descriptor];

    if (!LayoutComponent) {
        return <div>{`Unimplemented layout type: ${descriptor}`}</div>;
    }

    return <LayoutComponent pageProps={pageProps} layoutProps={layoutProps} />;
};
