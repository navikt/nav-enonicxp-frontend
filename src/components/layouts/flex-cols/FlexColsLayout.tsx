import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import './FlexColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FlexColsLayoutProps;
};

export const FlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions.flexcols;
    if (!regionProps) {
        return null;
    }

    const { numCols, bgColor, bgFullWidth } = layoutProps.config;

    const regionStyle = {
        ...(bgColor && { backgroundColor: bgColor }),
    };

    return regionProps ? (
        <Region
            pageProps={pageProps}
            regionProps={regionProps}
            style={regionStyle}
            modifier={String(numCols)}
        />
    ) : null;
};
