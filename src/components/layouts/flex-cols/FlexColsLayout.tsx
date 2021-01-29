import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import './FlexColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FlexColsLayoutProps;
};

export const FlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions.flexcols;

    if (!regionProps) {
        return pageProps.editMode ? <div>{'Flex placeholder'}</div> : null;
    }

    const { numCols, bgColor, bgFullWidth, margin } = layoutProps.config;

    const layoutStyle = {
        ...(margin && { margin }),
        ...(bgColor && {
            backgroundColor: bgColor,
            ...(bgFullWidth && {
                width: '100vw',
                marginLeft: '-50vw',
                left: '50%',
            }),
        }),
    };

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            style={layoutStyle}
        >
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                bemModifier={`${numCols}-cols`}
            />
        </LayoutContainer>
    );
};
