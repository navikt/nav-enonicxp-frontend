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
    detailComponents: PartComponentProps[];
    pageProps: OverviewPageProps;
}

export const ExpandableProductDetails = ({
    productDetails,
    detailComponents,
    pageProps,
}: ExpandableProductDetailTypes) => {
    const { language } = usePageConfig();
    const getTranslationString = translator('overview', language);

    if (!detailComponents) {
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
        url: productDetails.idOrPath,
        text: productDetails.title,
    };

    return (
        <div className={style.detailsContainer}>
            {detailComponents.map((component, index) => (
                <PartsMapper
                    key={index}
                    pageProps={pageProps}
                    partProps={component}
                />
            ))}
        </div>
    );
};
