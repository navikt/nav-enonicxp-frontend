import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { LegacyLayoutProps } from '../../../types/component-props/layouts/legacy-layout';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LegacyLayoutProps;
};

export const ProductDetailsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    const regionHelpText = [
        'Introduksjon: Vises kun på oversiktssiden',
        'Hovedinnhold: Vises på oversiktssiden og på produktsiden',
        'Oppsummering: Vises kun på oversiktssiden',
    ];

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {Object.values(regions).map((regionProps, index) => {
                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regionProps}
                        key={index}
                        helpText={regionHelpText[index]}
                    />
                );
            })}
        </LayoutContainer>
    );
};
