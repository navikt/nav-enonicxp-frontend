import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { SituationPageFlexColsLayoutProps } from '../../../types/component-props/layouts/situation-flex-cols';
import { Header } from '../../_common/header/Header';
import { TypoStyle } from '../../../types/typo-style';
import './FlexColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: SituationPageFlexColsLayoutProps;
};

export const SituationPageFlexColsLayout = ({
    pageProps,
    layoutProps,
}: Props) => {
    const regionProps = layoutProps.regions.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { title, numCols, justifyContent } = config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {title && (
                <Header
                    tag={'h2'}
                    typoStyle={TypoStyle.Systemtittel}
                    justify={'left'}
                >
                    {title}
                </Header>
            )}
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                regionStyle={regionStyle}
                bemModifier={`${numCols}-cols`}
            />
        </LayoutContainer>
    );
};
