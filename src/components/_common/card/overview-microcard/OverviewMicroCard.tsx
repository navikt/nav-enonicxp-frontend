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
    targetLanguage: string;
    className?: string;
};

export const OverviewMicroCard = ({
    url,
    type,
    title,
    targetLanguage,
    className,
}: Props) => {
    const { language: overviewLanguage } = usePageConfig();
    const headingText = translator('overview', overviewLanguage)('more');

    const showWarningForNorwegianLink =
        overviewLanguage === 'en' && isNorwegianLanguage(targetLanguage);

    return (
        <div className={className}>
            <Heading level={'3'} size={'small'}>
                {headingText}
                {showWarningForNorwegianLink && ' (in Norwegian)'}
            </Heading>
            <MicroCard
                type={cardTypeMap[type]}
                link={{ url: url, text: title }}
            />
        </div>
    );
};
