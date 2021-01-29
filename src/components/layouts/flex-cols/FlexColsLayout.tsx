import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import { LayoutWrapper } from '../LayoutWrapper';
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

    const layoutStyle = bgColor && {
        backgroundColor: bgColor,
        ...(bgFullWidth && {
            width: '100vw',
            marginLeft: '-50vw',
            left: '50%',
        }),
    };

    return (
        <LayoutWrapper
            pageProps={pageProps}
            layoutProps={layoutProps}
            style={layoutStyle}
        >
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                modifier={String(numCols)}
            />
        </LayoutWrapper>
    );
};
