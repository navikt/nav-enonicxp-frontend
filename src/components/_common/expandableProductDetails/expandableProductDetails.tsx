import { Heading, Loader } from '@navikt/ds-react';
import { PartsMapper } from 'components/parts/PartsMapper';
import { CardType } from 'types/card';
import { PartComponentProps } from '../../../types/component-props/_component-common';

import { MicroCard } from 'components/_common/card/MicroCard';

import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { LinkProps } from 'types/link-props';

import style from './expandableProductDetails.module.scss';

interface ExpandableProductDetailsTypes {
    productDetails: any;
    productRegions: {
        [key: string]: {
            name: string;
            components: PartComponentProps;
        };
    }[];
    pageProps: OverviewPageProps;
}

export const ExpandableProductDetails = ({
    productDetails,
    productRegions,
    pageProps,
}: ExpandableProductDetailsTypes) => {
    const cardLink: LinkProps = {
        url: productDetails._path,
        text: productDetails.title,
    };

    console.log(productRegions);

    if (!productRegions) {
        return (
            <div className={style.detailsLoader}>
                <Loader size="large" />
            </div>
        );
    }

    return (
        <div className={style.detailsContainer}>
            {productRegions.map((regions) =>
                Object.values(regions).map((region: any) =>
                    region.components.map((component, index) => (
                        <PartsMapper
                            key={index}
                            pageProps={pageProps}
                            partProps={component}
                        />
                    ))
                )
            )}
            <Heading size="small" level="3" spacing>
                Mer om {productDetails.title}
            </Heading>
            <MicroCard link={cardLink} type={CardType.Product} />
        </div>
    );
};
