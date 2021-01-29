import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedColsLayout } from './fixed-cols/FixedColsLayout';
import { FlexColsLayout } from './flex-cols/FlexColsLayout';
import { LegacyLayout } from './legacy/LegacyLayout';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

const layoutComponents: {
    [key in LayoutType]: React.FunctionComponent<Props>;
} = {
    [LayoutType.Main]: LegacyLayout,
    [LayoutType.Main1Col]: LegacyLayout,
    [LayoutType.MainPage]: LegacyLayout,
    [LayoutType.Dynamic2Col]: FixedColsLayout,
    [LayoutType.Dynamic3Col]: FixedColsLayout,
    [LayoutType.Dynamic4Col]: FixedColsLayout,
    [LayoutType.DynamicFlexCols]: FlexColsLayout,
};

export const LayoutMapper = ({ pageProps, layoutProps }: Props) => {
    const { descriptor } = layoutProps;

    const LayoutComponent = layoutComponents[descriptor];

    if (!LayoutComponent) {
        return <div>{`Unimplemented layout type: ${descriptor}`}</div>;
    }

    return <LayoutComponent pageProps={pageProps} layoutProps={layoutProps} />;
};

export default LayoutMapper;
