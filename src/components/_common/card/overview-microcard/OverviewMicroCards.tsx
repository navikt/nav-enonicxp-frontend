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

type Props = {
    cardPropsList: CardProps[];
    className?: string;
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

export const OverviewMicroCards = ({ cardPropsList, className }: Props) => {
    const { language: pageLanguage } = usePageConfig();

    const headingText = translator('overview', pageLanguage)('more');

    const { withStandardReadMore, withEnglishWarningReadMore } =
        splitByHeaderType(cardPropsList, pageLanguage);

    return (
        <div className={className}>
            {withStandardReadMore.length > 0 && (
                <>
                    <Heading level={'3'} size={'small'}>
                        {headingText}
                    </Heading>
                    {withStandardReadMore.map((card) => (
                        <MicroCard
                            type={cardTypeMap[card.type]}
                            link={{ url: card.url, text: card.title }}
                        />
                    ))}
                </>
            )}
            {withEnglishWarningReadMore.length > 0 && (
                <>
                    <Heading level={'3'} size={'small'}>
                        {`${headingText} (in Norwegian)`}
                    </Heading>
                    {withEnglishWarningReadMore.map((card) => (
                        <MicroCard
                            type={cardTypeMap[card.type]}
                            link={{ url: card.url, text: card.title }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};
