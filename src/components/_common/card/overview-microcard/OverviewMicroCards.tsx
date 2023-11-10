import React from 'react';
import { Heading } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { ContentType } from 'types/content-props/_content-common';
import { cardTypeMap } from 'components/_common/card/card-utils';
import { Language, translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { isNorwegianLanguage } from 'utils/languages';

type CardProps = {
    type: ContentType;
    url: string;
    title: string;
    targetLanguage: string;
};

type CardPropsSplit = {
    withStandardReadMore: CardProps[];
    withEnglishWarningReadMore: CardProps[];
};

const splitByHeaderType = (
    cardPropsList: CardProps[],
    pageLanguage: Language
): CardPropsSplit => {
    if (pageLanguage !== 'en') {
        return {
            withStandardReadMore: cardPropsList,
            withEnglishWarningReadMore: [],
        };
    }

    return cardPropsList.reduce<CardPropsSplit>(
        (acc, cardProps) => {
            if (isNorwegianLanguage(cardProps.targetLanguage)) {
                acc.withEnglishWarningReadMore.push(cardProps);
            } else {
                acc.withStandardReadMore.push(cardProps);
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

const CardsList = ({ cardPropsList }: { cardPropsList: CardProps[] }) =>
    cardPropsList.map((cardProps) => (
        <MicroCard
            type={cardTypeMap[cardProps.type]}
            link={{ url: cardProps.url, text: cardProps.title }}
            key={cardProps.url}
        />
    ));

type Props = {
    cardPropsList: CardProps[];
    className?: string;
};

export const OverviewMicroCards = ({ cardPropsList, className }: Props) => {
    const { language: pageLanguage } = usePageConfig();

    const headingText = translator('overview', pageLanguage)('more');

    const { withStandardReadMore, withEnglishWarningReadMore } =
        splitByHeaderType(cardPropsList, pageLanguage);

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
