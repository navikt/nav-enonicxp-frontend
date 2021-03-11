import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import './SectionWithHeaderLayout.less';
import { LightBulb } from '@navikt/ds-icons';
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

    const { title, anchorId } = config;

    return (
        <ProductPageLayout.Panel
            title={title}
            anchor={anchorId}
            icon={<LightBulb />}
        >
            <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
                <Region pageProps={pageProps} regionProps={regions.content} />
            </LayoutContainer>
        </ProductPageLayout.Panel>
    );
};
