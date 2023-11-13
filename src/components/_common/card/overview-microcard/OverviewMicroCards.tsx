import React from 'react';
import { Heading } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { cardTypeMap } from 'components/_common/card/card-utils';
import { Language, translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
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
    <Heading level={'3'} size={'small'}>
        {text}
    </Heading>
);

const CardsList = ({
    cardPropsList,
}: {
    cardPropsList: OverviewPageProductLink[];
}) =>
    cardPropsList.map((cardProps) => (
        <MicroCard
            type={cardTypeMap[cardProps.type]}
            link={{ url: cardProps.url, text: cardProps.title }}
            key={cardProps.url}
        />
    ));

type Props = {
    productLinks: OverviewPageProductLink[];
    className?: string;
};

export const OverviewMicroCards = ({ productLinks, className }: Props) => {
    const { language: pageLanguage } = usePageConfig();

    if (productLinks.length === 0) {
        return null;
    }

    const headingText = translator('overview', pageLanguage)('more');

    const { withStandardReadMore, withEnglishWarningReadMore } =
        splitByHeaderType(productLinks, pageLanguage);

    return (
        <div className={className}>
            {withStandardReadMore.length > 0 && (
                <>
                    <CardsHeader text={headingText} />
                    <CardsList cardPropsList={withStandardReadMore} />
                </>
            )}
            {withEnglishWarningReadMore.length > 0 && (
                <>
                    <CardsHeader text={`${headingText} (in Norwegian)`} />
                    <CardsList cardPropsList={withEnglishWarningReadMore} />
                </>
            )}
        </div>
    );
};
