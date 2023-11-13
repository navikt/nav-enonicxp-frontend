import React, { Fragment } from 'react';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailType } from 'types/content-props/product-details';
import {
    ProductDetailsPageProps,
    ProductDetailsPageRegionName,
} from 'types/component-props/pages/product-details-layout';
import { RegionProps } from 'types/component-props/layouts';

import style from './ProductDetailsLayout.module.scss';

type ProductDetailsRegions =
    ProductDetailsPageProps['regions'][ProductDetailsPageRegionName];

const processRegionProps = (
    name: ProductDetailsPageRegionName,
    regionProps: ProductDetailsRegions,
    isEditView: boolean
): RegionProps => {
    if (name !== 'outro' || isEditView) {
        return regionProps;
    }

    // Microcard links in this region were previously added manually as components,
    // but are now generated automatically
    // Filter out any manually added microcard components as a workaround for now
    // TODO: Can be removed once these components have been removed from all product details
    return {
        ...regionProps,
        components: regionProps?.components?.filter(
            (component) =>
                !(
                    component.type === 'part' &&
                    component.descriptor === 'no.nav.navno:product-card-micro'
                )
        ),
    };
};

const getRegionHelpTexts = (
    detailType: ProductDetailType
): Record<ProductDetailsPageRegionName, string> => ({
    intro: 'Introduksjon: Vises kun på oversiktssiden.',
    main:
        detailType === ProductDetailType.PROCESSING_TIMES
            ? 'Hovedinnhold, søknad: Vises på oversiktssiden og på produktsiden.'
            : 'Hovedinnhold: Vises på oversiktssiden og på produktsiden.',
    main_complaint:
        'Hovedinnhold, klage: Vises på oversiktssiden og på produktsiden.',
    outro: 'Oppsummering: Vises kun på oversiktssiden.',
});

type Props = {
    pageProps: ProductDetailsProps;
    layoutProps?: ProductDetailsPageProps;
};

export const ProductDetailsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    // As the layout is shared between product listing and isolated product details,
    // we need to determine the detailType by checking both detailType and overviewType (for product overview)
    const detailType = pageProps.data.detailType || pageProps.data.overviewType;

    const regionHelpTexts = getRegionHelpTexts(detailType);

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.productDetails}
        >
            {Object.entries(regions).map(([regionName, regionProps]) => {
                // The 'main_complaint' section in product details is only applicable
                // for product detail types === 'processing_times'
                if (
                    regionName === 'main_complaint' &&
                    detailType !== 'processing_times'
                ) {
                    return null;
                }

                const processedRegionProps = processRegionProps(
                    regionName as ProductDetailsPageRegionName,
                    regionProps,
                    !!pageProps.editorView
                );

                return (
                    <Fragment key={regionName}>
                        <EditorHelp
                            text={regionHelpTexts[regionName]}
                            type="arrowDown"
                        />
                        <Region
                            pageProps={pageProps}
                            regionProps={processedRegionProps}
                        />
                    </Fragment>
                );
            })}
        </LayoutContainer>
    );
};
