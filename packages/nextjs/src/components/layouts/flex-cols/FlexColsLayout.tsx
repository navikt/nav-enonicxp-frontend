import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { FlexColsLayoutProps } from 'types/component-props/layouts/flex-cols';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { Header } from 'components/_common/headers/Header';

import style from './FlexColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: FlexColsLayoutProps;
};

export const FlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { numCols, justifyContent, collapse, title, anchorId } = config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    const colCount =
        collapse && numCols === 3
            ? regionProps.components.length % numCols === 0
                ? numCols
                : 2
            : numCols;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps} className={style.flexCols}>
            {title && (
                <Header level={'2'} size={'large'} anchorId={anchorId} className={style.header}>
                    {title}
                </Header>
            )}
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                regionStyle={regionStyle}
                bemModifier={`${colCount}-cols`}
            />
        </LayoutContainer>
    );
};
