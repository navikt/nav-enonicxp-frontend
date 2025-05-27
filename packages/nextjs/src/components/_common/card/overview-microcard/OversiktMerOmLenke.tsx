import React from 'react';
import { Language, translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { isNorwegianLanguage } from 'utils/languages';
import { OverviewPageProductLink } from 'types/content-props/overview-props';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { LowercaseFirstLetter } from 'utils/lowercaseFirstLetter';

type ProductLinksSplit = {
    withStandardReadMore: OverviewPageProductLink[];
    withEnglishWarningReadMore: OverviewPageProductLink[];
};

const splitByHeaderType = (
    productLinks: OverviewPageProductLink[],
    pageLanguage: Language
): ProductLinksSplit => {
    if (pageLanguage !== 'en') {
        return {
            withStandardReadMore: productLinks,
            withEnglishWarningReadMore: [],
        };
    }

    return productLinks.reduce<ProductLinksSplit>(
        (acc, productLink) => {
            if (isNorwegianLanguage(productLink.language)) {
                acc.withEnglishWarningReadMore.push(productLink);
            } else {
                acc.withStandardReadMore.push(productLink);
            }

            return acc;
        },
        {
            withStandardReadMore: [],
            withEnglishWarningReadMore: [],
        }
    );
};

const MerOmLenke = ({
    productLinks,
    text,
}: {
    productLinks: OverviewPageProductLink[];
    text: string;
}) => {
    return productLinks.map((productLink) => (
        <LenkeStandalone href={productLink.url} withArrow key={productLink.url}>
            {text + ' ' + LowercaseFirstLetter(productLink.title)}
        </LenkeStandalone>
    ));
};

type Props = {
    productLinks: OverviewPageProductLink[];
    className?: string;
};

export const OversiktMerOmLenke = ({ productLinks, className }: Props) => {
    const { language: pageLanguage } = usePageContentProps();

    if (productLinks.length === 0) {
        return null;
    }

    const headingText = translator('overview', pageLanguage)('more');

    const { withStandardReadMore, withEnglishWarningReadMore } = splitByHeaderType(
        productLinks,
        pageLanguage
    );

    return (
        <div className={className}>
            {withStandardReadMore.length > 0 && (
                <MerOmLenke productLinks={withStandardReadMore} text={headingText} />
            )}
            {withEnglishWarningReadMore.length > 0 && (
                <MerOmLenke
                    productLinks={withEnglishWarningReadMore}
                    text={`${headingText} (in Norwegian)`}
                />
            )}
        </div>
    );
};
