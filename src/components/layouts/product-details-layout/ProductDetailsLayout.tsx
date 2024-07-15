import React, { Fragment } from 'react';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ProductDetailType } from 'types/content-props/product-details';
import {
    ProductDetailsPageProps,
    ProductDetailsPageRegionName,
} from 'types/component-props/pages/product-details-layout';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

import style from './ProductDetailsLayout.module.scss';

const getRegionHelpTexts = (
    detailType: ProductDetailType
): Record<ProductDetailsPageRegionName, string> => ({
    intro: 'Introduksjon: Vises kun på oversiktssiden.',
    main:
        detailType === ProductDetailType.PROCESSING_TIMES
            ? 'Hovedinnhold, søknad: Vises på oversiktssiden og på produktsiden.'
            : 'Hovedinnhold: Vises på oversiktssiden og på produktsiden.',
    main_complaint: 'Hovedinnhold, klage: Vises på oversiktssiden og på produktsiden.',
    outro: 'Oppsummering: Vises kun på oversiktssiden.',
});

// As the layout is shared between product listing and isolated product details,
// we need to determine the detailType by checking both detailType and overviewType (for product overview)
const getProductDetailType = (contentProps: ContentProps) => {
    const { type, data } = contentProps;
    return type === ContentType.Overview
        ? data.overviewType
        : type === ContentType.ProductDetails
          ? data.detailType
          : null;
};

type Props = {
    pageProps: ContentProps;
    layoutProps: ProductDetailsPageProps;
};

export const ProductDetailsLayout = ({ pageProps, layoutProps }: Props) => {
    const detailType = getProductDetailType(pageProps);
    if (!detailType) {
        return <EditorHelp text={'Detalj-type er ikke satt for dette innholdet'} />;
    }

    const { regions } = layoutProps;
    if (!regions) {
        return null;
    }

    const regionHelpTexts = getRegionHelpTexts(detailType);

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.productDetails}
        >
            {Object.values(regions).map((regionProps) => {
                const { name } = regionProps;

                // The 'main_complaint' section in product details is only applicable
                // for product detail types === 'processing_times'
                if (
                    name === 'main_complaint' &&
                    detailType !== ProductDetailType.PROCESSING_TIMES
                ) {
                    return null;
                }

                return (
                    <Fragment key={name}>
                        <EditorHelp text={regionHelpTexts[name]} type="arrowDown" />
                        <Region pageProps={pageProps} regionProps={regionProps} />
                    </Fragment>
                );
            })}
        </LayoutContainer>
    );
};
