import React from 'react';
import { Heading } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { ContentType } from 'types/content-props/_content-common';
import { cardTypeMap } from 'components/_common/card/card-utils';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { isNorwegianLanguage } from 'utils/languages';

type Props = {
    type: ContentType;
    url: string;
    title: string;
    productLanguage: string;
};

export const FormsOverviewProductLink = ({
    url,
    type,
    title,
    productLanguage,
}: Props) => {
    const { language: pageLanguage } = usePageConfig();
    const headingText = translator('overview', pageLanguage)('more');

    const showWarningForNorwegianLink =
        pageLanguage === 'en' && isNorwegianLanguage(productLanguage);

    return (
        <>
            <Heading level={'3'} size={'small'}>
                {headingText}
                {showWarningForNorwegianLink && ' (in Norwegian)'}
            </Heading>
            <MicroCard
                type={cardTypeMap[type]}
                link={{ url: url, text: title }}
            />
        </>
    );
};
