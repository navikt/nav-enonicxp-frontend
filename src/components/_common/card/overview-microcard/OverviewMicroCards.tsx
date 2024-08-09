import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard/MicroCard';
import { cardTypeMap } from 'components/_common/card/card-utils';
import { Language, translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { isNorwegianLanguage } from 'utils/languages';
import { OverviewPageProductLink } from 'types/content-props/overview-props';

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

const CardsHeader = ({ text }: { text: string }) => (
    <BodyShort weight={'semibold'}>{text}</BodyShort>
);

const CardsList = ({ productLinks }: { productLinks: OverviewPageProductLink[] }) =>
    productLinks.map((productLink) => (
        <MicroCard
            type={cardTypeMap[productLink.type]}
            link={{ url: productLink.url, text: productLink.title }}
            key={productLink.url}
        />
    ));

type Props = {
    productLinks: OverviewPageProductLink[];
    className?: string;
};

export const OverviewMicroCards = ({ productLinks, className }: Props) => {
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
                <>
                    <CardsHeader text={headingText} />
                    <CardsList productLinks={withStandardReadMore} />
                </>
            )}
            {withEnglishWarningReadMore.length > 0 && (
                <>
                    <CardsHeader text={`${headingText} (in Norwegian)`} />
                    <CardsList productLinks={withEnglishWarningReadMore} />
                </>
            )}
        </div>
    );
};
