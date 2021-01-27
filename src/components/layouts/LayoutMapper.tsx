import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedCols } from './fixed-cols/FixedCols';
import { FlexCols } from './flex-cols/FlexCols';
import { BEM } from '../../utils/bem';

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
    const { descriptor, path, type, config } = layoutProps;

    const Component = layoutComponents[descriptor];

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const componentStyle = config?.margin && {
        margin: `${config?.margin}`,
    };

    return (
        <div
            className={bem(layoutName)}
            style={componentStyle}
            data-portal-component-type={type}
            data-portal-component={path}
            data-th-remove="tag"
        >
            {Component ? (
                <Component pageProps={pageProps} layoutProps={layoutProps} />
            ) : (
                <div>{`Unimplemented layout type: ${descriptor}`}</div>
            )}
        </div>
    );
};

export default LayoutMapper;
