import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutFlexCols } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import './FlexCols.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutFlexCols;
};

export const FlexCols = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions.flexcols;
    if (!regionProps) {
        return null;
    }

    const { numCols, bgColor, bgFullWidth } = layoutProps.config;

    const style = {};

    return regionProps ? (
        <Region
            pageProps={pageProps}
            regionProps={regionProps}
            style={style}
            modifier={String(numCols)}
        />
    ) : null;
};
