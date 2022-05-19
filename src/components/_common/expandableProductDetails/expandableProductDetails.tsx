import { Heading, Loader } from '@navikt/ds-react';

import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { SimplifiedProductData } from 'types/component-props/_mixins';

import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { MicroCard } from 'components/_common/card/MicroCard';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { PartComponentProps } from '../../../types/component-props/_component-common';
import { PartsMapper } from 'components/parts/PartsMapper';

import style from './expandableProductDetails.module.scss';

interface ExpandableProductDetailTypes {
    productDetails: SimplifiedProductData;
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
}: ExpandableProductDetailTypes) => {
    const { language } = usePageConfig();
    const getTranslationString = translator('overview', language);

    if (!productRegions) {
        return (
            <div className={style.detailsLoader}>
                <Loader
                    size="large"
                    aria-label={getTranslationString('loading')}
                />
            </div>
        );
    }

    const cardLink: LinkProps = {
        url: productDetails._path,
        text: productDetails.title,
    };

    return (
        <div className={style.detailsContainer}>
            {productRegions.map((regions) =>
                Object.values(regions).map((region: any) =>
                    region.components.map(
                        (component: PartComponentProps, index: number) => (
                            <PartsMapper
                                key={index}
                                pageProps={pageProps}
                                partProps={component}
                            />
                        )
                    )
                )
            )}
            <Heading size="small" level="3" spacing>
                {getTranslationString('moreAbout')} {productDetails.title}
            </Heading>
            <MicroCard link={cardLink} type={CardType.Product} />
        </div>
    );
};
