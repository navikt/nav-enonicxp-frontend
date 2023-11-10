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

import style from './ProductDetailsLayout.module.scss';
import { RegionProps } from 'types/component-props/layouts';

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

    // Micro-card links in this region were previously added manually as components,
    // but are now generated automatically
    // Filter out any micro-card components as a workaround for now
    // Can be removed once these components have been removed from all product details
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
            {Object.entries(regions).map(([regionName, regionProps], index) => {
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
                            text={regionHelpText[index]}
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
