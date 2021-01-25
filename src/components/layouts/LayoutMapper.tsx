import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedCols } from './fixed-cols/FixedCols';
import { FlexCols } from './flex-cols/FlexCols';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

const layoutComponents: {
    [key in LayoutType]: React.FunctionComponent<Props>;
} = {
    [LayoutType.Main]: FixedCols,
    [LayoutType.Main1Col]: FixedCols,
    [LayoutType.MainPage]: FixedCols,
    [LayoutType.Dynamic2Col]: FixedCols,
    [LayoutType.Dynamic3Col]: FixedCols,
    [LayoutType.Dynamic4Col]: FixedCols,
    [LayoutType.DynamicFlexCols]: FlexCols,
};

export const LayoutMapper = ({ pageProps, layoutProps }: Props) => {
    const { descriptor } = layoutProps;
    console.log(descriptor);

    const Component = layoutComponents[descriptor];

    return Component ? (
        <Component pageProps={pageProps} layoutProps={layoutProps} />
    ) : (
        <div>{`Unimplemented layout type: ${descriptor}`}</div>
    );
};

export default LayoutMapper;
