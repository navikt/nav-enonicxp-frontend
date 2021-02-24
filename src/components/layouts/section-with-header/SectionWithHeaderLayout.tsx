import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import { SectionHeader } from '../../_common/section-header/SectionHeader';
import Region from '../Region';
import './SectionWithHeaderLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: SectionWithHeaderProps;
};

export const SectionWithHeaderLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return null;
    }

    const { title, anchorId, justify } = config;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <SectionHeader text={title} anchorId={anchorId} justify={justify} />
            <Region pageProps={pageProps} regionProps={regions.content} />
        </LayoutContainer>
    );
};
