import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import './SectionWithHeaderLayout.less';
import { ProductPageLayout } from '@navikt/ds-react';
import { LayoutContainer } from '../LayoutContainer';

type Props = {
    pageProps: ContentProps;
    layoutProps?: SectionWithHeaderProps;
};

export const SectionWithHeaderLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return null;
    }

    const { title, anchorId, icon, highlight } = config;

    return (
        <ProductPageLayout.Panel
            component={LayoutContainer}
            className={'TEST'}
            pageProps={pageProps}
            layoutProps={layoutProps}
            title={title}
            anchor={anchorId}
            highlight={highlight}
            icon={icon?.mediaUrl && <img src={icon.mediaUrl} />}
        >
            <Region pageProps={pageProps} regionProps={regions.content} />
        </ProductPageLayout.Panel>
    );
};
