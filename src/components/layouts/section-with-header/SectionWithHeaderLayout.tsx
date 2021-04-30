import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { ProductPagePanel } from '@navikt/ds-react/esm/layouts';
import { LayoutContainer } from '../LayoutContainer';
import { XpImage } from '../../_common/image/XpImage';
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

    const { title, anchorId, icon, highlight } = config;

    const iconElement = icon?.mediaUrl && (
        <XpImage imageProps={icon} alt={''} />
    );

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {typeof window !== 'undefined' && (
                <ProductPagePanel
                    title={title}
                    anchor={anchorId}
                    highlight={highlight}
                    icon={iconElement}
                >
                    <Region
                        pageProps={pageProps}
                        regionProps={regions.content}
                    />
                </ProductPagePanel>
            )}
        </LayoutContainer>
    );
};
