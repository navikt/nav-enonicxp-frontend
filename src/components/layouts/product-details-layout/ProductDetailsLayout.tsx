import React, { Fragment } from 'react';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { LegacyLayoutProps } from '../../../types/component-props/layouts/legacy-layout';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailType } from 'types/content-props/product-details';

import style from './ProductDetailsLayout.module.scss';

type Props = {
    pageProps: ProductDetailsProps;
    layoutProps?: LegacyLayoutProps;
};

export const ProductDetailsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;
    const { detailType } = pageProps.data;

    if (!regions) {
        return null;
    }

    const regionHelpText = [
        'Introduksjon: Vises kun på oversiktssiden',
        detailType === ProductDetailType.PROCESSING_TIMES
            ? 'Hovedinnhold, søknad: Vises på oversiktssiden og på produktsiden'
            : 'Hovedinnhold: Vises på oversiktssiden og på produktsiden.',
        'Hovedinnhold, klage: Vises på oversiktssiden og på produktsiden.',
        'Oppsummering: Vises kun på oversiktssiden',
    ];

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.productDetails}
        >
            {Object.keys(regions).map((key, index) => {
                const regionProps = regions[key];

                // The 'main_complaint' section in product details is only applicable
                // for product detail types === 'processing_times'
                if (
                    key === 'main_complaint' &&
                    detailType !== 'processing_times'
                ) {
                    return null;
                }
                return (
                    <Fragment key={index}>
                        <EditorHelp
                            text={regionHelpText[index]}
                            type="arrowDown"
                        />
                        <Region
                            pageProps={pageProps}
                            regionProps={regionProps}
                        />
                    </Fragment>
                );
            })}
        </LayoutContainer>
    );
};
